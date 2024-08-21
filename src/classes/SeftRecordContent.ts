import dataParsers from "../utils/dataParsers";
import recordTypes from "../utils/recordTypes";
import { decoder, saveBufferAsFile, setStringToDataView } from "../utils/utils";

class SeftRecordContent {
    viewer: DataView;
    padding: string;
    recordType: string;
    dataType: string;
    contentLen: number;
    recordNameLen: number;
    recordName: string;
    recordRawData: ArrayBuffer;
    value: any;
    isDOFSRecord: boolean;

    constructor(recordContent: DataView) {
        this.viewer = recordContent;
        this.padding = this.viewer.getUint16(0, true).toString(16);
        this.recordType = this.viewer
            .getUint16(2, true)
            .toString(16)
            .padStart(3, "0");
        this.recordNameLen = this.viewer.getUint32(4, true);
        this.contentLen = this.viewer.byteLength - this.recordNameLen - 8;

        this.recordName = decoder.decode(
            this.viewer.buffer.slice(
                this.viewer.byteOffset + 8,
                this.viewer.byteOffset + 8 + this.recordNameLen
            )
        );

        this.recordRawData = this.viewer.buffer.slice(
            this.viewer.byteOffset,
            this.viewer.byteOffset + this.viewer.byteLength
        );

        decoder.decode(this.recordRawData.slice(0, 4)) === "DOFS"
            ? (this.isDOFSRecord = true)
            : (this.isDOFSRecord = false);
        this.dataType = recordTypes[this.recordType].contentType;

        this.value = dataParsers[this.dataType]
            ? (this.value = dataParsers[this.dataType](
                  this.recordRawData.slice(-this.contentLen)
              ))
            : (this.value = this.recordRawData);
    }

    public exportValue(path: string, format: string): void {
        saveBufferAsFile(this.value, path, format);
    }

    public set setPadding(padding: string) {
        this.padding = padding;
        this.viewer.setInt16(0, parseInt(padding, 16));
    }
    public set setRecordType(recordType: string) {
        this.recordType = recordType;
        this.dataType = recordTypes[this.recordType].contentType;
        this.viewer.setUint16(2, parseInt(recordType, 16));
    }

    public set setRecordName(name: string) {
        this.recordName = name;
        setStringToDataView(this.viewer, 8, name);
        this.recordNameLen = Buffer.from(name).byteLength;
        this.viewer.setUint32(4, this.recordNameLen);
    }
    public set setRecordRawData(data: ArrayBuffer) {
        this.recordRawData = data;
        this.dataType = recordTypes[this.recordType].contentType;

        // this.value = dataParsers[this.dataType]
        //     ? (this.value = dataParsers[this.dataType](this.recordRawData.slice(-this.contentLen)))
        //     : (this.value = this.recordRawData);
    }
}

export default SeftRecordContent;
