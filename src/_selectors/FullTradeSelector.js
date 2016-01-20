import { createStructuredSelector } from 'reselect';
import { List } from 'immutable';
import { durationUnits } from '../_constants/TradeParams';
import { groupByKey } from '../_utils/ArrayUtils';
import { durationToSecs } from '../_utils/TradeUtils';

const normalizedContractFor = contracts => {
    const extraRemoved = contracts.map(contract => ({
        amount_per_point: contract.amount_per_point,
        barrier: contract.barrier,
        barriers: contract.barriers,
        contract_category: contract.contract_category,
        contract_category_display: contract.contract_category_display,
        contract_display: contract.contract_display,
        contract_type: contract.contract_type,
        expiry_type: contract.expiry_type,
        high_barrier: contract.high_barrier,
        last_digit_range: contract.last_digit_range,
        low_barrier: contract.low_barrier,
        min_contract_duration: contract.min_contract_duration,
        max_contract_duration: contract.max_contract_duration,
        stop_type: contract.stop_type,
        stop_loss: contract.stop_loss,
        stop_profit: contract.stop_profit,
    }));

    const groupByCategory = groupByKey(extraRemoved, 'contract_category');
    const allCategory = Object.keys(groupByCategory);
    allCategory.forEach(c => {
        const relatedContracts = groupByCategory[c];
        const groupByType = groupByKey(relatedContracts, 'contract_type');
        groupByCategory[c] = groupByType;
    });

    return groupByCategory;
};

const extractBarrier = (contracts, type) => {
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
            result[et] = [{ name: barrierName, defaultValue: contractWithBarrier && contractWithBarrier.barrier }];
        });
        return result;
    };

    const groupByExpiryType = groupByKey(contracts, 'expiry_type');
    switch (type) {
        case 'CALL': {
            return extract1BarrierHelper(groupByExpiryType, 'Higher than');
        }
        case 'PUT': {
            return extract1BarrierHelper(groupByExpiryType, 'Lower than');
        }
        case 'ASIANU': {
            return undefined;
        }
        case 'ASIAND': {
            return undefined;
        }
        case 'DIGITMATCH': {
            return extractDigitBarrierHelper(groupByExpiryType);
        }
        case 'DIGITDIFF': {
            return extractDigitBarrierHelper(groupByExpiryType);
        }
        case 'DIGITODD': {
            return undefined;
        }
        case 'DIGITEVEN': {
            return undefined;
        }
        case 'DIGITOVER': {
            return extractDigitBarrierHelper(groupByExpiryType);
        }
        case 'DIGITUNDER': {
            return extractDigitBarrierHelper(groupByExpiryType);
        }
        case 'EXPIRYMISS': {
            return extract2BarriersHelper(groupByExpiryType);
        }
        case 'EXPIRYRANGE': {
            return extract2BarriersHelper(groupByExpiryType);
        }
        case 'RANGE': {
            return extract2BarriersHelper(groupByExpiryType);
        }
        case 'UPORDOWN': {
            return extract2BarriersHelper(groupByExpiryType);
        }
        case 'ONETOUCH': {
            return extract1BarrierHelper(groupByExpiryType, 'Touch spot');
        }
        case 'NOTOUCH': {
            return extract1BarrierHelper(groupByExpiryType, 'Touch spot');
        }
        case 'SPREADU': return undefined;
        case 'SPREADD': return undefined;
        default: {
            throw new Error('Unknown trading type');
        }
    }
};

const durationSecHelper = duration => {
    const d = +duration.slice(0, -1);
    const u = duration.slice(-1);
    return durationToSecs(d, u);
};

const secsToDifferentUnit = sec => {
    const minute = Math.floor(sec / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);

    return [sec, minute, hour, day];
};

const minMaxInUnits = (min, max) => {
    const minInUnits = secsToDifferentUnit(min);
    const maxInUnits = secsToDifferentUnit(max);
    const durations = [];
    for (let i = 0; i < minInUnits.length; i++) {
        const unit = durationUnits[i + 1];
        if (maxInUnits[i] > 1) {
            durations.push({
                unit,
                min: minInUnits[i] > 0 ? minInUnits[i] : 1,
                max: maxInUnits[i] });
        }
    }
    return durations;
};

const extractDuration = (contracts, type) => {
    if (type.indexOf('SPREAD') > -1) {
        return [];
    }

    const tickContracts = contracts.filter(c => c.min_contract_duration.slice(-1) === 't');
    const tickDuration = tickContracts.length > 0 ? { min: 5, max: 10, unit: 't' } : undefined;

    const nonTickContracts = contracts.filter(c => c.min_contract_duration.slice(-1) !== 't');
    if (nonTickContracts.length === 0) {
        return [tickDuration];
    }
    const nonTickMinSec = nonTickContracts
        .map(c => durationSecHelper(c.min_contract_duration))
        .reduce((a, b) => Math.min(a, b));

    const nonTickMaxSec = nonTickContracts
        .map(c => durationSecHelper(c.max_contract_duration))
        .reduce((a, b) => Math.max(a, b));

    const nonTicksDuration = minMaxInUnits(nonTickMinSec, nonTickMaxSec);
    if (tickDuration) {
        nonTicksDuration.unshift(tickDuration);
    }

    return nonTicksDuration;
};

const extractSpreadInfo = contracts => {
    const amountPerPoint = contracts[0].amount_per_point;
    const stopType = contracts[0].stop_type;
    const stopLoss = contracts[0].stop_loss;
    const stopProfit = contracts[0].stop_profit;

    return {
        amountPerPoint,
        stopType,
        stopLoss,
        stopProfit,
    };
};

/**
 * end result should contain information
 * to generate form, requires
 * list of min, max, unit [{ min, max, unit}]
 * list of [{barrier_name, barrier_default}]
*/
const contractAggregation = (contracts, type) => {
    const barriers = extractBarrier(contracts, type);
    const durations = extractDuration(contracts, type);

    let spread = undefined;
    if (type.indexOf('SPREAD') > -1) {
        spread = extractSpreadInfo(contracts);
    }

    return {
        barriers,
        durations,
        spread,
    };
};

const contractsSelector = state => {
    const allContracts = state.tradingOptions.map(symbol => {
        const normalized = normalizedContractFor(symbol);
        Object.keys(normalized).forEach(category => {
            const categoryObj = normalized[category];
            Object.keys(categoryObj).forEach(type => {
                const contractsPerType = contractAggregation(categoryObj[type], type);
                categoryObj[type] = contractsPerType;
            });
            normalized[category] = categoryObj;
        });
        return normalized;
    });
    return allContracts.toJS();
};

const tradesSelector = state => state.trades.toJS();

const assetsSelector = state => {
    const symbolsToArray = sym => sym.map((v, k) => ({ text: v.get('display_name'), value: k }));
    const submarketsToSymbols = submarkets => {
        return submarkets.reduce((r, v) => {
            return r.concat(symbolsToArray(v.get('symbols')));
        }, List.of());
    };
    const marketToSymbols = markets => markets.map(m => {
        const s = submarketsToSymbols(m.get('submarkets'));
        return s;
    });
    const wholeTree = state.assets.get('tree');
    return marketToSymbols(wholeTree).toJS();
};

const ticksSelector = state => state.ticks.toJS();

const currencySelector = state => state.account.get('currency');

export const fullTradesSelector = createStructuredSelector({
    contracts: contractsSelector,
    trades: tradesSelector,
    assets: assetsSelector,
    ticks: ticksSelector,
    currency: currencySelector,
});
