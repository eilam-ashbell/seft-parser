/// <reference types="node" />
declare const decoder: TextDecoder;
declare function uint8ArrayToHex(data: Uint8Array): string;
declare function readJpegFile(path: string): ArrayBuffer | null;
declare function saveBufferAsFile(data: ArrayBuffer, path: string, format: string): void;
declare function setBufferToDataView(view: DataView, offset: number, buffer: Buffer): void;
declare function setStringToDataView(view: DataView, offset: number, str: string): void;
declare function epocParse(data: ArrayBuffer): string;
declare function bytesToNumber(data: ArrayBuffer): number;
declare function epochToTimestamp(epoc: number): string;
export { readJpegFile, uint8ArrayToHex, decoder, saveBufferAsFile, setStringToDataView, setBufferToDataView, epocParse, epochToTimestamp, bytesToNumber, };
