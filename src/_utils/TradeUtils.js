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

export const isIntraday = (duration, unit) =>
    durationToSecs(duration, unit) < 60 * 60 * 24;

export const contractCategoryDisplay = category => ({
    callput: 'Up/Down',
    risefall: 'Rise/Fall',
    higherlower: 'Higher/Lower',
    asian: 'Asians',
    digits: 'Digits',
    endsinout: 'Ends In/Out',
    staysinout: 'Stays In/Out',
    touchnotouch: 'Touch/No Touch',
    spreads: 'Spreads',
})[category];

export const askPriceFromProposal = proposal =>
    proposal && +proposal.ask_price;

// TODO: consider spread, then payout?
export const netProfitFromProposal = proposal =>
    +proposal.payout - +proposal.ask_price;

export const returnPercentageFromProposal = proposal =>
    netProfitFromProposal(proposal) / askPriceFromProposal(proposal) * 100;

export const digitOptionsByType = type => {
	switch (type) {
		case 'DIGITOVER': {
			return digitOptions(0, 9);
		}
		case 'DIGITUNDER': {
			return digitOptions(1, 10);
		}
		default: {
			return digitOptions(0, 10);
		}
	}
};

export const isDurationTick = duration =>
    duration && duration.slice(-1) === 't';

export const isDurationLessThan2Mins = (duration, durationUnit) =>
    isDurationTick(durationUnit) || durationToSecs(duration, durationUnit) < 120;

export const getLastTick = ticks =>
    (ticks && ticks.length > 0) ? ticks[ticks.length - 1].quote : 0;
