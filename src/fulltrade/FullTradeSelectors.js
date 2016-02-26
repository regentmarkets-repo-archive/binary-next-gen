import { createSelector, createStructuredSelector } from 'reselect';
import { nowAsEpoch } from '../_utils/DateUtils';
import { assetsSelector, currencySelector, ticksSelector, tradingTimesSelector } from '../_store/directSelectors';
import { marketTreeSelector } from '../_selectors/marketTreeSelector';
import { extractBarrier } from '../_utils/BarrierUtils';
import { extractDuration, extractForwardStartingDuration } from '../_utils/DurationUtils';
import { extractSpreadInfo } from '../_utils/SpreadUtils';
import { availableAssetsFilter, flattenSubmarkets } from '../_utils/AssetUtils';
import { normalizedContractFor } from '../_utils/ContractUtils';

/**
 * end result should contain information
 * to generate form, requires
 * list of min, max, unit [{ min, max, unit}]
 * list of [{barrier_name, barrier_default}]
*/
const aggregateContracts = (contracts, type) => ({
    barriers: extractBarrier(contracts, type),
    durations: extractDuration(contracts, type),
    forwardStartingDuration: extractForwardStartingDuration(contracts, type),
    spread: (type.indexOf('SPREAD') > -1) ? extractSpreadInfo(contracts) : null,
});

const contractsPerSymbol = createSelector(
    contracts => contracts,
    contracts => {
        const normalized = normalizedContractFor(contracts);
        Object.keys(normalized).forEach(category => {
            const categoryObj = normalized[category];
            Object.keys(categoryObj).forEach(type => {
                const contractsPerType = aggregateContracts(categoryObj[type], type);
                categoryObj[type] = contractsPerType;
            });
            normalized[category] = categoryObj;
        });
        return normalized;
    }
);

export const availableContractsSelector = createSelector(
    state => state.tradingOptions,
    tradingOptions =>
        tradingOptions.map(contractBySymbol => contractsPerSymbol(contractBySymbol))
);

export const tradesWithDetailsSelector = createSelector(
    [state => state.trades, assetsSelector],
    (trades, assets) =>
        trades.map(t => {
            const symbolDetails = assets.find(a => a.get('symbol') === t.get('symbol'));
            const pipSize = symbolDetails && symbolDetails.get('pip').length - 1;
            return t.set('pipSize', pipSize);
        })
);

export const availableAssetsSelector = createSelector(
    [tradingTimesSelector, marketTreeSelector],
    (tradingTimes, marketTree) => {
        const assetsGroupByMarkets = flattenSubmarkets(marketTree.toJS());
        const times = tradingTimes.toJS();
        return Object.keys(assetsGroupByMarkets).reduce((acc, m) => {
            acc[m] = availableAssetsFilter(assetsGroupByMarkets[m], times, nowAsEpoch());
            return acc;
        }, {});
    }
);

export const fullTradesSelector = createStructuredSelector({
    contracts: availableContractsSelector,
    trades: tradesWithDetailsSelector,
    assets: availableAssetsSelector,
    ticks: ticksSelector,
    currency: currencySelector,
});
