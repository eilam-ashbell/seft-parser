import SeftRecord from "./SeftRecord";
import SeftRecordContent from "./SeftRecordContent";
import { headers } from "../utils/consts";
import { readJpegFile } from "../utils/utils";
class Seft {
    constructor(image) {
        this.isSeftExist = false; // SEFT header is the 4 bytes at the end of the file
        this.sefhMarkerOffset = null;
        this.headersBlockEndOffset = null;
        this.seftMarkerOffset = null;
        this.records = {};
        let imageData;
        if (typeof image === "string") {
            imageData = readJpegFile("./img/dofs_test.jpeg");
        }
        else {
            imageData = image;
        }
        this.viewer = new DataView(imageData);
        // check for SEFT existence
        let seftOffset = this.viewer.byteLength;
        for (let i = seftOffset; i >= 4; i--) {
            if (this.viewer.getUint32(i - 4) === headers.seftHex) {
                this.isSeftExist = true;
                this.headersBlockEndOffset = i;
                this.seftMarkerOffset = i - 4;
            }
        }
        if (!this.isSeftExist) {
            throw new Error("No SEFT segment in this data");
        }
        this.headersBlockLength = this.viewer.getUint32(this.viewer.byteLength - 8, true);
        this.headersBlockStartOffset =
            this.viewer.byteLength - (this.headersBlockLength + 8);
        this.seftVersion = this.viewer.getUint32(this.headersBlockStartOffset + 4, true);
        this.sefhMarkerOffset = this.headersBlockStartOffset;
        this.recordsCount = this.viewer.getUint32(this.headersBlockStartOffset + 8, true);
        let currentOffset = this.headersBlockStartOffset + 12; // 12 = SEFH header [4] + version indicator [4] + records count indicator [4]
        // loop to get all records
        for (let i = 0; i < this.recordsCount; i++) {
            this.records[i] = new SeftRecord(new DataView(this.viewer.buffer, currentOffset));
            const recordStartOffset = this.headersBlockStartOffset - this.records[i].offsetToContent;
            this.records[i].content = new SeftRecordContent(new DataView(this.viewer.buffer, recordStartOffset, this.records[i].contentLength));
            currentOffset += 12; // each record is 12 bytes length
        }
        this.segmentData = this.viewer.buffer.slice(this.headersBlockStartOffset - this.records[0].offsetToContent, this.viewer.byteLength);
    }
    get metadata() {
        if (this.records) {
            const recordValues = Object.values(this.records).map((rec) => { var _a, _b; return [(_a = rec.content) === null || _a === void 0 ? void 0 : _a.recordName, (_b = rec.content) === null || _b === void 0 ? void 0 : _b.value]; });
            const metadata = Object.fromEntries(recordValues);
            return metadata;
        }
        else {
            return null;
        }
    }
}
export default Seft;
