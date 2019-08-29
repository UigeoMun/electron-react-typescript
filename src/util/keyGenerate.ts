import * as R from 'ramda';

export type CsvFormat = {
    catNum: string;
    lotNum: string;
    expiryDate: string;
};

const genFirst = (csvRow: CsvFormat): string => {
    const TRANS = 91;
    let firstDigit = String(TRANS - csvRow.catNum.charCodeAt(0));
    let secondDigit = String(TRANS - csvRow.catNum.charCodeAt(1));
    const isLength1 = (digit: string) => R.equals(1, digit.length);

    if (isLength1(firstDigit)) {
        firstDigit = '0'.concat(firstDigit);
    }
    if (isLength1(secondDigit)) {
        secondDigit = '0'.concat(secondDigit);
    }
    return firstDigit.concat(secondDigit);
};

const genSecond = (csvRow: CsvFormat): string => {
    return csvRow.catNum.slice(2) + csvRow.lotNum.slice(1, 4);
};

const genThird = (csvRow: CsvFormat): string => {
    const [year, month, day] = csvRow.expiryDate.split('-');
    return getRandomInt(10) + month + year.slice(2, 4);
};

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const genKey = (csvRow: CsvFormat): string => {
    const first = genFirst(csvRow);
    const second = genSecond(csvRow);
    const third = genThird(csvRow);
    return R.join('-', [first, second, third]);
};
