import { tradeTypes } from '../_constants/TradeParams';

export const tradeTypeTextToCode = text => tradeTypes.find(x => x.text === text).code;
export const tradeTypeCodeToText = code => tradeTypes.find(x => x.value === code).text;
export const typeHasBarrier = type => tradeTypes.find(x => x.value === type).barrier;
export const tradeToFriendlyType = (code, barrier) =>
    tradeTypeCodeToText(code) + (typeHasBarrier(code) ? ' ' + barrier : '');
export const pipsToDigits = pips => Math.abs(Math.log10(pips));
