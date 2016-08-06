import { isIntraday } from 'binary-utils';

export default (contracts, category, type, duration, durationUnit) => {
    if (category === 'spreads') {
        return [undefined, undefined];
    }

    let expiryType;
    if (durationUnit === 't') {
        expiryType = 'tick';
    } else if (isIntraday(duration, durationUnit)) {
        expiryType = 'intraday';
    } else {
        expiryType = 'daily';
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
            case 'tick':
            case 'intraday':
            case 'daily': return [+barrierByExpiry[0].defaultValue];
            default: throw new Error('unknown expiry');
        }
    }

    if (barrierByExpiry.length === 2) {
        switch (expiryType) {
            case 'tick':
            case 'intraday':
            case 'daily': return [+barrierByExpiry[0].defaultValue, +barrierByExpiry[1].defaultValue];
            default: throw new Error('unknown expiry');
        }
    }

    throw new Error('default barrier creation failed');
};
