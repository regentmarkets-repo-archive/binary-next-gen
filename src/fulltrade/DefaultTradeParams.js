import { durationToSecs, isIntraday } from '../_utils/TradeUtils';

export const createDefaultType = (contracts, category) =>
    Object.keys(contracts[category])[0];

export const createDefaultDuration = (contracts, category, type) => {
    if (category === 'spreads') {
        return [undefined, undefined];
    }
    const d = contracts[category][type].durations[0];
    return [d.min, d.unit];
};

export const createDefaultBarriers = (contracts, category, type, duration, durationUnit) => {
    if (category === 'spreads') {
        return [];
    }

    let expiryType;
    if (durationUnit === 't') {
        expiryType = 'tick';
    } else if (isIntraday(duration, durationUnit)) {
        expiryType = 'intraday';
    } else {
        expiryType = 'daily';
    }

    // this is an observation, might not always true
    if (durationToSecs(duration, durationUnit) < 120) {
        return [undefined, undefined];
    }

    const barriers = contracts[category][type].barriers;
    if (!barriers) {
        return [undefined, undefined];
    }

    const barrierByExpiry = barriers[expiryType];
    if (category === 'digits') {
        return [barrierByExpiry && barrierByExpiry[0].defaultValue];
    }

    if (!barrierByExpiry) {
        // this expiry type have no barrier
        return [undefined, undefined];
    }

    if (barrierByExpiry.length === 1) {
        switch (expiryType) {
            case 'tick': {
                return [undefined, undefined];
            }
            case 'intraday': return [+barrierByExpiry[0].defaultValue];
            case 'daily': return [+barrierByExpiry[0].defaultValue];
            default: throw new Error('unknown expiry');
        }
    }

    if (barrierByExpiry.length === 2) {
        switch (expiryType) {
            case 'tick': {
                return [undefined, undefined];
            }
            case 'intraday': return [+barrierByExpiry[0].defaultValue, +barrierByExpiry[1].defaultValue];
            case 'daily': return [+barrierByExpiry[0].defaultValue, +barrierByExpiry[1].defaultValue];
            default: throw new Error('unknown expiry');
        }
    }

    throw new Error('default barrier creation failed');
};
