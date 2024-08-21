"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils/utils");
const Seft_1 = __importDefault(require("./classes/Seft"));
// const imageData = readJpegFile("./img/s23_ultra_rear.jpg");
const imageData = (0, utils_1.readJpegFile)("./img/test.jpg");
// const imageData = readJpegFile("./img/test2.heic");
// const imageData = readJpegFile("./img/dofs_test.jpeg");
if (imageData) {
    const seft = new Seft_1.default(imageData);
    console.log(seft.records);
}
