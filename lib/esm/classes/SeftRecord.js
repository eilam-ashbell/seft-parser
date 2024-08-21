class SeftRecord {
    constructor(record) {
        this.content = null;
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
        this.contentLength = this.viewer.getUint32(8, true);
    }
    set setPadding(padding) {
        this.padding = padding;
        this.viewer.setInt16(0, parseInt(padding, 16), true);
    }
    set setType(type) {
        this.type = type;
        this.viewer.setUint32(2, parseInt(type, 16));
    }
    set setOffsetToContent(offset) {
        this.offsetToContent = offset;
        this.viewer.setUint32(4, offset);
    }
    set setContentLength(len) {
        this.contentLength = len;
        this.viewer.setUint32(8, len);
    }
    set setContent(content) {
        this.content = content;
        this.setContentLength =
            8 + content.recordNameLen + content.recordRawData.byteLength;
    }
}
export default SeftRecord;
