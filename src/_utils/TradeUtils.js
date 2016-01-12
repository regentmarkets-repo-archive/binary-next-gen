import { tradeTypes, durationUnit } from '../_constants/TradeParams';

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

export const durationText = unit => {
    switch (unit) {
        case 't': return 'Ticks';
        case 's': return 'Seconds';
        case 'm': return 'Minutes';
        case 'h': return 'Hours';
        case 'd': return 'Days';
        default: return null;
    }
};

export const durationTypes = (min, max) => {
    const minUnit = min.slice(-1)[0];
    const maxUnit = max.slice(-1)[0];

    const minIdx = durationUnit.indexOf(minUnit);
    const maxIdx = durationUnit.indexOf(maxUnit);

    return durationUnit.slice(minIdx, maxIdx + 1);
};

export const durationLarger = (a, b) => {
    const aUnit = a.slice(-1)[0];
    const bUnit = b.slice(-1)[0];
    const aUnitOrder = durationUnit.indexOf(aUnit);
    const bUnitOrder = durationUnit.indexOf(bUnit);
    const aValue = a.slice(0, -1);
    const bValue = b.slice(0, -1);

    if (aUnitOrder > bUnitOrder) {
        return true;
    }
    if (aUnitOrder < bUnitOrder) {
        return false;
    }

    return aValue > bValue;
};

export const durationLesser = (a, b) => {
    return (a !== b) && (durationLarger(a, b) === false);
};

export const durationIsBetween = (a, min, max) => {
    return durationLesser(a, max) && durationLarger(a, min);
};
