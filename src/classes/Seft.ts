import SeftRecord from "./SeftRecord";
import SeftRecordContent from "./SeftRecordContent";
import { headers } from "../utils/consts";
import { readJpegFile } from "../utils/utils";

class Seft {
    private viewer: DataView;
    private isSeftExist: boolean = false; // SEFT header is the 4 bytes at the end of the file
    headersBlockLength: number; // 4 bytes before SEFT header
    headersBlockStartOffset: number;
    sefhMarkerOffset: number | null = null;
    headersBlockEndOffset: number | null = null;
    seftMarkerOffset: number | null = null;
    seftVersion: number; // 4 bytes after SEFH header
    recordsCount: number; // 4 bytes after version indicator
    records: Record<number, SeftRecord> = {};
    segmentData: ArrayBuffer;

    constructor(image: ArrayBuffer | string) {
        let imageData: ArrayBuffer;
        if (typeof image === "string") {
            imageData = readJpegFile("./img/dofs_test.jpeg") as ArrayBuffer;
        } else {
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
        this.headersBlockLength = this.viewer.getUint32(
            this.viewer.byteLength - 8,
            true
        );
        this.headersBlockStartOffset =
            this.viewer.byteLength - (this.headersBlockLength + 8);
        this.seftVersion = this.viewer.getUint32(
            this.headersBlockStartOffset + 4,
            true
        );
        this.sefhMarkerOffset = this.headersBlockStartOffset;
        this.recordsCount = this.viewer.getUint32(
            this.headersBlockStartOffset + 8,
            true
        );

        let currentOffset = this.headersBlockStartOffset + 12; // 12 = SEFH header [4] + version indicator [4] + records count indicator [4]
        // loop to get all records
        for (let i = 0; i < this.recordsCount; i++) {
            this.records[i] = new SeftRecord(
                new DataView(this.viewer.buffer, currentOffset)
            );

            const recordStartOffset =
                this.headersBlockStartOffset - this.records[i].offsetToContent;

            this.records[i].content = new SeftRecordContent(
                new DataView(
                    this.viewer.buffer,
                    recordStartOffset,
                    this.records[i].contentLength
                )
            );

            currentOffset += 12; // each record is 12 bytes length
        }

        this.segmentData = this.viewer.buffer.slice(
            this.headersBlockStartOffset - this.records[0].offsetToContent,
            this.viewer.byteLength
        );
    }

    public get metadata(): Record<string, any> | null {
        if (this.records) {
            const recordValues: [string | undefined, any][] = Object.values(
                this.records
            ).map((rec) => [rec.content?.recordName, rec.content?.value]);
            const metadata = Object.fromEntries(recordValues);
            return metadata;
        } else {
            return null;
        }
    }

    // public set setRecord(record: IRecordData) {
    //     const viewer = new DataView(new ArrayBuffer(12));
    //     const typeNumber = parseInt(record.type, 16);
    //     const contentNumber = parseInt(record.content, 16);
    //     const contentLength = Buffer.byteLength(record.content);
    //     viewer.setUint16(2, typeNumber, false);
    //     viewer.setUint32(4, contentLength, true);
    //     viewer.setUint32(8, contentLength, true);
    //     const newRecord = new SeftRecord(viewer.buffer);

    //     // console.log(newRecord);

    //     // todo - organize offsets and orders
    //     // headersBlockLength
    //     this.headersBlockLength += 12;
    //     // headerBlockStartOffset
    //     this.headersBlockStartOffset += 12;
    //     // recordCount
    //     this.recordsCount++;
    //     // records
    //     this.records[this.recordsCount - 1] = newRecord;
    //     // seftMarkerOffset
    //     (this.seftMarkerOffset as number) += 12;
    //     // headerBlockEndOffset
    //     (this.headersBlockEndOffset as number) += 12;
    //     // sefhMarkerOffset
    //     // offsets for each record
    //     for (let i = this.recordsCount - 2; i >= 0; i--) {
    //         console.log(this.records[i].offsetToContent + contentLength);
    //         this.records[i].offsetToContent += contentLength;
    //         this.viewer.setUint32(4, this.records[1].offsetToContent)
    //     }
    // }
}

interface IRecordData {
    type: string;
    content: string;
}

export default Seft;
