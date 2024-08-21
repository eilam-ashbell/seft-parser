"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const utils_1 = require("./utils");
const dataParsers = {
    timestamp: (data) => {
        const epoc = (0, utils_1.bytesToNumber)(data);
        const date = (0, utils_1.epochToTimestamp)(epoc);
        return date;
    },
    mcc: (data) => {
        const mccNumber = (0, utils_1.bytesToNumber)(data);
        return `${mccNumber} - ${consts_1.mcc[mccNumber]}`;
    },
    ascii: (data) => {
        return utils_1.decoder.decode(Buffer.from(data));
    },
};
exports.default = dataParsers;
