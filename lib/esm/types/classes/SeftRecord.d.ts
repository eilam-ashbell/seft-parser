import SeftRecordContent from "./SeftRecordContent";
declare class SeftRecord {
    viewer: DataView;
    padding: string;
    type: string;
    offsetToContent: number;
    contentLength: number;
    content: SeftRecordContent | null;
    constructor(record: DataView);
    set setPadding(padding: string);
    set setType(type: string);
    set setOffsetToContent(offset: number);
    set setContentLength(len: number);
    set setContent(content: SeftRecordContent);
}
export default SeftRecord;
