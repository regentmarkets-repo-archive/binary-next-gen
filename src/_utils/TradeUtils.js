import { tradeTypes } from '../_constants/TradeParams';

export const tradeTypeTextToCode = text =>
    tradeTypes.find(x => x.text === text).value;

export const tradeTypeCodeToText = code =>
    tradeTypes.find(x => x.value === code).text;

export const typeHasBarrier = type =>
    !!tradeTypes.find(x => x.value === type).barrier;

export const tradeToFriendlyType = (code, barrier) =>
    tradeTypeCodeToText(code) + (typeHasBarrier(code) ? ' ' + barrier : '');

export const pipsToDigits = pips =>
    Math.abs(Math.log10(pips));

export const digitOptions = (from, to) => {
    const tArr = new Uint8Array(to - from);
    const arr = Array.from(tArr);
    return arr.map((i, idx) => idx + from).map(x => ({ value: x, text: x.toString() }));
};
