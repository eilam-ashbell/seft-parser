"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToNumber = exports.epochToTimestamp = exports.epocParse = exports.setBufferToDataView = exports.setStringToDataView = exports.saveBufferAsFile = exports.decoder = exports.uint8ArrayToHex = exports.readJpegFile = void 0;
const fs_1 = __importDefault(require("fs"));
const decoder = new TextDecoder("ascii");
exports.decoder = decoder;
function uint8ArrayToHex(data) {
    return Array.from(data)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}
exports.uint8ArrayToHex = uint8ArrayToHex;
function readJpegFile(path) {
    // Validate that the file exists
    if (!fs_1.default.existsSync(path)) {
        console.error(`File not found at path: ${path}`);
        return null;
    }
    try {
        // Read the file synchronously
        const fileData = fs_1.default.readFileSync(path);
        return fileData.buffer;
    }
    catch (error) {
        console.error(`Error reading file: ${error.message}`);
        return null;
    }
}
exports.readJpegFile = readJpegFile;
function saveBufferAsFile(data, path, format) {
    const buffer = Buffer.from(data);
    // Write the Buffer to a PNG file
    fs_1.default.writeFile(`${path}.${format}`, buffer, (err) => {
        if (err)
            throw err;
        console.log("The file has been saved!");
    });
}
exports.saveBufferAsFile = saveBufferAsFile;
function setBufferToDataView(view, offset, buffer) {
    for (let i = 0; i < buffer.length; i++) {
        view.setUint8(offset + i, buffer[i]);
    }
}
exports.setBufferToDataView = setBufferToDataView;
function setStringToDataView(view, offset, str) {
    for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
    }
}
exports.setStringToDataView = setStringToDataView;
function epocParse(data) {
    const epoc = bytesToNumber(data);
    const date = epochToTimestamp(epoc);
    return date;
}
exports.epocParse = epocParse;
function bytesToNumber(data) {
    const dataBuffer = Buffer.from(data);
    // Convert the Buffer to a string
    const numberString = dataBuffer.toString("ascii");
    // Convert the string to a number
    const numberValue = parseInt(numberString, 10);
    return numberValue;
}
exports.bytesToNumber = bytesToNumber;
function epochToTimestamp(epoc) {
    const date = new Date(epoc);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} GMT`;
}
exports.epochToTimestamp = epochToTimestamp;
