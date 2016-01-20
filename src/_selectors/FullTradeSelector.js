import { createStructuredSelector } from 'reselect';
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
    switch (type) {
        case 'CALL': {
            return [{ name: 'Higher than', defaultValue: 0 }];
        }
        case 'PUT': {
            return [{ name: 'Lower than', defaultValue: 0 }];
        }
        case 'ASIANU': {
            return undefined;
        }
        case 'ASIAND': {
            return undefined;
        }
        case 'DIGITMATCH': {
            return [{ name: 'Digit', defaultValue: contracts[0].last_digit_range }];
        }
        case 'DIGITDIFF': {
            return [{ name: 'Digit', defaultValue: contracts[0].last_digit_range }];
        }
        case 'DIGITODD': {
            return undefined;
        }
        case 'DIGITEVEN': {
            return undefined;
        }
        case 'DIGITOVER': {
            return [{ name: 'Digit', defaultValue: contracts[0].last_digit_range }];
        }
        case 'DIGITUNDER': {
            return [{ name: 'Digit', defaultValue: contracts[0].last_digit_range }];
        }
        case 'EXPIRYMISS': {
            return [
                { name: 'High barrier', defaultValue: +contracts[0].high_barrier },
                { name: 'Low barrier', defaultValue: +contracts[0].low_barrier },
            ];
        }
        case 'EXPIRYRANGE': {
            return [
                { name: 'High barrier', defaultValue: +contracts[0].high_barrier },
                { name: 'Low barrier', defaultValue: +contracts[0].low_barrier },
            ];
        }
        case 'RANGE': {
            return [
                { name: 'High barrier', defaultValue: +contracts[0].high_barrier },
                { name: 'Low barrier', defaultValue: +contracts[0].low_barrier },
            ];
        }
        case 'UPORDOWN': {
            return [
                { name: 'High barrier', defaultValue: +contracts[0].high_barrier },
                { name: 'Low barrier', defaultValue: +contracts[0].low_barrier },
            ];
        }
        case 'ONETOUCH': {
            return [
                { name: 'Touch spot', defaultValue: +contracts[0].barrier },
            ];
        }
        case 'NOTOUCH': {
            return [
                { name: 'Touch spot', defaultValue: +contracts[0].barrier },
            ];
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
    const availables = state.assetPicker.get('availableAssets').toJS();
    return availables.map(asset => ({ text: asset.display_name, value: asset.symbol }));
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
