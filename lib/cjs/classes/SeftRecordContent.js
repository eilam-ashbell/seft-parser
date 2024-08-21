"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataParsers_1 = __importDefault(require("../utils/dataParsers"));
const recordTypes_1 = __importDefault(require("../utils/recordTypes"));
const utils_1 = require("../utils/utils");
class SeftRecordContent {
    constructor(recordContent) {
        this.viewer = recordContent;
        this.padding = this.viewer.getUint16(0, true).toString(16);
        this.recordType = this.viewer
            .getUint16(2, true)
            .toString(16)
            .padStart(3, "0");
        this.recordNameLen = this.viewer.getUint32(4, true);
        this.contentLen = this.viewer.byteLength - this.recordNameLen - 8;
        this.recordName = utils_1.decoder.decode(this.viewer.buffer.slice(this.viewer.byteOffset + 8, this.viewer.byteOffset + 8 + this.recordNameLen));
        this.recordRawData = this.viewer.buffer.slice(this.viewer.byteOffset, this.viewer.byteOffset + this.viewer.byteLength);
        utils_1.decoder.decode(this.recordRawData.slice(0, 4)) === "DOFS"
            ? (this.isDOFSRecord = true)
            : (this.isDOFSRecord = false);
        this.dataType = recordTypes_1.default[this.recordType].contentType;
        this.value = dataParsers_1.default[this.dataType]
            ? (this.value = dataParsers_1.default[this.dataType](this.recordRawData.slice(-this.contentLen)))
            : (this.value = this.recordRawData);
    }
    exportValue(path, format) {
        (0, utils_1.saveBufferAsFile)(this.value, path, format);
    }
    set setPadding(padding) {
        this.padding = padding;
        this.viewer.setInt16(0, parseInt(padding, 16));
    }
    set setRecordType(recordType) {
        this.recordType = recordType;
        this.dataType = recordTypes_1.default[this.recordType].contentType;
        this.viewer.setUint16(2, parseInt(recordType, 16));
    }
    set setRecordName(name) {
        this.recordName = name;
        (0, utils_1.setStringToDataView)(this.viewer, 8, name);
        this.recordNameLen = Buffer.from(name).byteLength;
        this.viewer.setUint32(4, this.recordNameLen);
    }
    set setRecordRawData(data) {
        this.recordRawData = data;
        this.dataType = recordTypes_1.default[this.recordType].contentType;
        // this.value = dataParsers[this.dataType]
        //     ? (this.value = dataParsers[this.dataType](this.recordRawData.slice(-this.contentLen)))
        //     : (this.value = this.recordRawData);
    }
}
exports.default = SeftRecordContent;
