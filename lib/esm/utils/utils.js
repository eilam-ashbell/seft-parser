import fs from "fs";
const decoder = new TextDecoder("ascii");
function uint8ArrayToHex(data) {
    return Array.from(data)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}
function readJpegFile(path) {
    // Validate that the file exists
    if (!fs.existsSync(path)) {
        console.error(`File not found at path: ${path}`);
        return null;
    }
    try {
        // Read the file synchronously
        const fileData = fs.readFileSync(path);
        return fileData.buffer;
    }
    catch (error) {
        console.error(`Error reading file: ${error.message}`);
        return null;
    }
}
function saveBufferAsFile(data, path, format) {
    const buffer = Buffer.from(data);
    // Write the Buffer to a PNG file
    fs.writeFile(`${path}.${format}`, buffer, (err) => {
        if (err)
            throw err;
        console.log("The file has been saved!");
    });
}
function setBufferToDataView(view, offset, buffer) {
    for (let i = 0; i < buffer.length; i++) {
        view.setUint8(offset + i, buffer[i]);
    }
}
function setStringToDataView(view, offset, str) {
    for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
    }
}
function epocParse(data) {
    const epoc = bytesToNumber(data);
    const date = epochToTimestamp(epoc);
    return date;
}
function bytesToNumber(data) {
    const dataBuffer = Buffer.from(data);
    // Convert the Buffer to a string
    const numberString = dataBuffer.toString("ascii");
    // Convert the string to a number
    const numberValue = parseInt(numberString, 10);
    return numberValue;
}
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
export { readJpegFile, uint8ArrayToHex, decoder, saveBufferAsFile, setStringToDataView, setBufferToDataView, epocParse, epochToTimestamp, bytesToNumber, };
