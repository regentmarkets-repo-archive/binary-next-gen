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
const contractAggregation = (contracts, type) => ({
    barriers: extractBarrier(contracts, type),
    durations: extractDuration(contracts, type),
    forwardStartingDuration: extractForwardStartingDuration(contracts, type),
    spread: (type.indexOf('SPREAD') > -1) ? extractSpreadInfo(contracts) : null,
});

const contractPerSymbol = createSelector(
    symbol => symbol,
    symbol => {
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
    }
);

const contractsSelector = createSelector(
    state => state.tradingOptions,
    tradingOptions =>
        tradingOptions.map(symbol => contractPerSymbol(symbol))
);

export const tradesSelector = createSelector(
    [state => state.trades, assetsSelector],
    (trades, assets) =>
        trades.map(t => {
            const symbolDetails = assets.find(a => a.get('symbol') === t.get('symbol'));
            const pipSize = symbolDetails && symbolDetails.get('pip').length - 1;
            return t.set('pipSize', pipSize);
        })
);

const availableAssetsSelector = createSelector(
    [tradingTimesSelector, marketTreeSelector],
    (tradingTimes, marketTree) => {
        const assetsGroupByMarkets = flattenSubmarkets(marketTree.toJS());
        const times = tradingTimes.toJS();
        const filteredAssets = {};
        Object.keys(assetsGroupByMarkets).forEach(m =>
            filteredAssets[m] = availableAssetsFilter(assetsGroupByMarkets[m], times, nowAsEpoch())
        );
        return filteredAssets;
    }
);

export const fullTradesSelector = createStructuredSelector({
    contracts: contractsSelector,
    trades: tradesSelector,
    assets: availableAssetsSelector,
    ticks: ticksSelector,
    currency: currencySelector,
});
