import SeftRecord from "./SeftRecord";
declare class Seft {
    private viewer;
    private isSeftExist;
    headersBlockLength: number;
    headersBlockStartOffset: number;
    sefhMarkerOffset: number | null;
    headersBlockEndOffset: number | null;
    seftMarkerOffset: number | null;
    seftVersion: number;
    recordsCount: number;
    records: Record<number, SeftRecord>;
    segmentData: ArrayBuffer;
    constructor(image: ArrayBuffer | string);
    get metadata(): Record<string, any> | null;
}
export default Seft;
