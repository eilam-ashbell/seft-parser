import SeftRecordContent from "./SeftRecordContent";

class SeftRecord {
    viewer: DataView;
    padding: string;
    type: string;
    offsetToContent: number;
    contentLen: number;
    content: SeftRecordContent | null = null;

    constructor(record: DataView) {
        this.viewer = record;
        this.padding = this.viewer
            .getUint16(0, true)
            .toString(16)
            .padStart(2, "0");
        this.type = this.viewer
            .getUint16(2, true)
            .toString(16)
            .padStart(3, "0");
        this.offsetToContent = this.viewer.getUint32(4, true);
        this.contentLen = this.viewer.getUint32(8, true);
    }

    public set setPadding(padding: string) {
        this.padding = padding;
        this.viewer.setInt16(0, parseInt(padding, 16), true);
    }
    public set setType(type: string) {
        this.type = type;
        this.viewer.setUint32(2, parseInt(type, 16));
    }
    public set setOffsetToContent(offset: number) {
        this.offsetToContent = offset;
        this.viewer.setUint32(4, offset);
    }
    public set setContentLength(len: number) {
        this.contentLen = len;
        this.viewer.setUint32(8, len);
    }
    public set setContent(content: SeftRecordContent) {
        this.content = content;
        this.setContentLength =
            8 + content.recordNameLen + content.recordRawData.byteLength;
    }
}

export default SeftRecord;
