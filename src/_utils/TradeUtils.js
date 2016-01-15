import { tradeTypes, durationUnits } from '../_constants/TradeParams';

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
        default: return undefined;
    }
};

export const durationToSecs = (duration, unit) => {
    switch (unit) {
        case 's': return 1 * duration;
        case 'm': return 60 * duration;
        case 'h': return 3600 * duration;
        case 'd': return 86400 * duration;
        default: return undefined;
    }
};

export const durationTypes = (min, max) => {
    const minUnit = min.slice(-1)[0];
    const maxUnit = max.slice(-1)[0];

    const minIdx = durationUnits.indexOf(minUnit);
    const maxIdx = durationUnits.indexOf(maxUnit);

    return durationUnits.slice(minIdx, maxIdx + 1);
};

export const durationLarger = (a, b) => {
    const aUnit = a.slice(-1)[0];
    const bUnit = b.slice(-1)[0];

    const oneT = aUnit === 't' ? bUnit !== 't' : bUnit === 't';
    if (oneT) {
        throw new Error('ticks cannot be compared to other unit');
    }

    const aValue = +(a.slice(0, -1));
    const bValue = +(b.slice(0, -1));
    const aInSecs = durationToSecs(aValue, aUnit);
    const bInSecs = durationToSecs(bValue, bUnit);

    return aInSecs > bInSecs;
};

export const durationLesser = (a, b) => {
    return (a !== b) && (durationLarger(a, b) === false);
};

// this function is inclusive to fit use case
export const durationIsBetween = (a, min, max) => {
    if (a.indexOf('t') !== -1) {
        const tick = +a.slice(-1);
        return tick >= 5 && tick <= 10;
    }
    return (!durationLesser(a, min)) && (!durationLarger(a, max));
};
