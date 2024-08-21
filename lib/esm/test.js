import { readJpegFile } from "./utils/utils";
import Seft from "./classes/Seft";
// const imageData = readJpegFile("./img/s23_ultra_rear.jpg");
const imageData = readJpegFile("./img/test.jpg");
// const imageData = readJpegFile("./img/test2.heic");
// const imageData = readJpegFile("./img/dofs_test.jpeg");
if (imageData) {
    const seft = new Seft(imageData);
    console.log(seft.records);
}
