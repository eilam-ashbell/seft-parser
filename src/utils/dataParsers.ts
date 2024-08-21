import { mcc } from "./consts";
import { bytesToNumber, epochToTimestamp, decoder } from "./utils";

const dataParsers: Record<string, Function> = {
    timestamp: (data: ArrayBuffer): string => {
        const epoc = bytesToNumber(data);
        const date = epochToTimestamp(epoc);
        return date;
    },
    mcc: (data: ArrayBuffer): string => {
        const mccNumber = bytesToNumber(data);
        return `${mccNumber} - ${mcc[mccNumber]}`;
    },
    ascii: (data: ArrayBuffer): string => {
        return decoder.decode(Buffer.from(data));
    },
};

export default dataParsers;
