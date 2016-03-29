import groupByKey from '../_utils/groupByKey';

const extractDigitBarrierHelper = contractsGroupedByExpiry => {
    const expiryTypes = Object.keys(contractsGroupedByExpiry);
    const result = {};
    expiryTypes.forEach(et => {
        const contractsByExpiry = contractsGroupedByExpiry[et];
        result[et] = [{
            name: 'Digit',
            values: contractsByExpiry[0].last_digit_range,
            defaultValue: contractsByExpiry[0].last_digit_range[0],
        }];
    });
    return result;
};

const extract2BarriersHelper = contractsGroupedByExpiry => {
    const expiryTypes = Object.keys(contractsGroupedByExpiry);
    const result = {};
    expiryTypes.forEach(et => {
        const contractsByExpiry = contractsGroupedByExpiry[et];
        result[et] = [
            { name: 'High barrier', defaultValue: contractsByExpiry[0].high_barrier },
            { name: 'Low barrier', defaultValue: contractsByExpiry[0].low_barrier },
        ];
    });
    return result;
};

const extract1BarrierHelper = (contractGroupedByExpiry, barrierName) => {
    const expiryTypes = Object.keys(contractGroupedByExpiry);
    const result = {};
    expiryTypes.forEach(et => {
        const contractsByExpiry = contractGroupedByExpiry[et];
        const contractWithBarrier = contractsByExpiry.find(c => !!c.barrier);
        if (!contractWithBarrier) {
            return;
        }
        result[et] = [{ name: barrierName, defaultValue: contractWithBarrier.barrier }];
    });
    return result;
};

export default (contracts, type) => {
    const groupByExpiryType = groupByKey(contracts, 'expiry_type');

    switch (type) {
        case 'CALL':
            return extract1BarrierHelper(groupByExpiryType, 'Higher than');
        case 'PUT':
            return extract1BarrierHelper(groupByExpiryType, 'Lower than');
        case 'ASIANU':
        case 'ASIAND':
            return undefined;
        case 'DIGITMATCH':
        case 'DIGITDIFF':
            return extractDigitBarrierHelper(groupByExpiryType);
        case 'DIGITODD':
        case 'DIGITEVEN':
            return undefined;
        case 'DIGITOVER':
        case 'DIGITUNDER':
            return extractDigitBarrierHelper(groupByExpiryType);
        case 'EXPIRYMISS':
        case 'EXPIRYRANGE':
        case 'RANGE':
        case 'UPORDOWN':
            return extract2BarriersHelper(groupByExpiryType);
        case 'ONETOUCH':
        case 'NOTOUCH':
            return extract1BarrierHelper(groupByExpiryType, 'Touch spot');
        case 'SPREADU':
        case 'SPREADD':
            return undefined;
        default: {
            throw new Error(`Unknown trading type: ${type}`);
        }
    }
};
