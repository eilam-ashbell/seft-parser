import { mcc } from "./consts";
import { bytesToNumber, epochToTimestamp, decoder } from "./utils";
const dataParsers = {
    timestamp: (data) => {
        const epoc = bytesToNumber(data);
        const date = epochToTimestamp(epoc);
        return date;
    },
    mcc: (data) => {
        const mccNumber = bytesToNumber(data);
        return `${mccNumber} - ${mcc[mccNumber]}`;
    },
    ascii: (data) => {
        return decoder.decode(Buffer.from(data));
    },
};
export default dataParsers;
