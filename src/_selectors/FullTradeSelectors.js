import { createSelector, createStructuredSelector } from 'reselect';
import { List } from 'immutable';
import { durationUnits } from '../_constants/TradeParams';
import { groupByKey } from '../_utils/ArrayUtils';
import { durationToSecs } from '../_utils/TradeUtils';
import {
    epochToUTCTimeString,
    nowAsEpoch,
    timeStringBigger,
    timeStringSmaller,
    splitSecsToUnits,
} from '../_utils/DateUtils';
import { assetsSelector, marketTreeSelector } from './AssetSelectors';

import { tradingTimesSelector } from './TradingTimesSelectors';

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
        forward_starting_options: contract.forward_starting_options,
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
            if (!contractWithBarrier) {
                return;
            }
            result[et] = [{ name: barrierName, defaultValue: contractWithBarrier.barrier }];
        });
        return result;
    };

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
            throw new Error('Unknown trading type');
        }
    }
};

const durationSecHelper = duration => {
    const d = +duration.slice(0, -1);
    const u = duration.slice(-1);
    return durationToSecs(d, u);
};

const minMaxInUnits = (min, max) => {
    const minInUnits = splitSecsToUnits(min);
    const maxInUnits = splitSecsToUnits(max);
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

const extractDurationHelper = (contracts, type) => {
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

const extractForwardStartingDuration = (contracts, type) => {
    const forwardStartingContracts = contracts.filter(c => !!c.forward_starting_options);
    if (forwardStartingContracts.length === 0) {
        return undefined;
    }

    if (forwardStartingContracts.length > 1) {
        throw new Error('Assumption broken, more than one contract with forward starting options');
    }

    const forwardStartingRange = forwardStartingContracts[0].forward_starting_options
        .map(obj => {
            const open = new Date(obj.open * 1000);
            const close = new Date(obj.close * 1000);
            const date = new Date(obj.date * 1000);
            return { open, close, date };
        });

    const forwardStartingDurations = extractDurationHelper(forwardStartingContracts, type);
    return {
        range: forwardStartingRange,
        options: forwardStartingDurations,
    };
};

const extractDuration = (contracts, type) => {
    // const forwardStartingDuration = contracts.filter(c => !!c.forward_starting_options);
    const nonForwardStartingContracts = contracts.filter(c => !c.forward_starting_options);

    return extractDurationHelper(nonForwardStartingContracts, type);
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
const contractAggregation = (contracts, type) => ({
    barriers: extractBarrier(contracts, type),
    durations: extractDuration(contracts, type),
    forwardStartingDuration: extractForwardStartingDuration(contracts, type),
    spread: (type.indexOf('SPREAD') > -1) ? extractSpreadInfo(contracts) : null,
});

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

export const tradesSelector = state => state.trades.toJS();

const availableAssetsFilter = (assets, times, now) => {
    const nowInTimeString = epochToUTCTimeString(now);
    const availabilities = {};
    times.forEach(s => {
        if (!s.times) {
            return;
        }
        const open = s.times.open[0];
        const close = s.times.close[0];

        // assuming close time is larger than open time
        if (timeStringBigger(nowInTimeString, open) && timeStringSmaller(nowInTimeString, close)) {
            availabilities[s.symbol] = true;
        }
    });
    const availableAssets = assets.map(symbols => symbols.filter(s => availabilities[s.value]));
    return availableAssets;
};

const symbolsToArray = sym =>
    sym.map((v, k) => ({
        text: v.get('display_name'),
        value: k,
    }));

const submarketsToSymbols = submarkets =>
    submarkets.reduce((r, v) =>
        r.concat(symbolsToArray(v.get('symbols'))),
        List.of()
    );

const marketToSymbols = markets =>
    markets.map(m =>
        submarketsToSymbols(m.get('submarkets'))
    );

const availableAssetsSelector = createSelector(
    [assetsSelector, tradingTimesSelector, marketTreeSelector],
    (assets, tradingTimes, marketTree) =>
        availableAssetsFilter(marketToSymbols(marketTree), tradingTimes, nowAsEpoch()).toJS()
);

const ticksSelector = state => state.ticks.toJS();

const currencySelector = state => state.account.get('currency');

export const fullTradesSelector = createStructuredSelector({
    contracts: contractsSelector,
    trades: tradesSelector,
    assets: availableAssetsSelector,
    ticks: ticksSelector,
    currency: currencySelector,
});
