declare class SeftRecordContent {
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
    constructor(recordContent: DataView);
    exportValue(path: string, format: string): void;
    set setPadding(padding: string);
    set setRecordType(recordType: string);
    set setRecordName(name: string);
    set setRecordRawData(data: ArrayBuffer);
}
export default SeftRecordContent;
