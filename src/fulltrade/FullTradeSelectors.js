import { createSelector } from 'reselect';
import { nowAsEpoch } from '../_utils/DateUtils';
import { assetsSelector, tradingTimesSelector } from '../_store/directSelectors';
import { marketTreeSelector } from '../_selectors/marketTreeSelector';
import { extractBarrier } from '../_utils/BarrierUtils';
import { extractDuration, extractForwardStartingDuration } from '../_utils/DurationUtils';
import { extractSpreadInfo } from '../_utils/SpreadUtils';
import { availableAssetsFilter, flattenSubmarkets } from '../_utils/AssetUtils';
import { normalizedContractFor } from '../_utils/ContractUtils';
import { assetPickerItemsSelector } from '../asset-picker/AssetPickerSelectors';
import { groupByKey } from '../_utils/ArrayUtils';
import { findIfExist, filterObjectBy } from '../_utils/ObjectUtils';

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

export const assetsIsOpenSelector = createSelector(
    assetPickerItemsSelector,
    assetDetails => {
        const assetsIsOpen = assetDetails.map(a => ({ symbol: a.symbol, isOpen: a.isOpen }));
        const assetsIsOpenObject = groupByKey(assetsIsOpen.toJS(), 'symbol');
        for (let sym in assetsIsOpenObject) {
            if (assetsIsOpenObject.hasOwnProperty(sym)) {
                assetsIsOpenObject[sym] = assetsIsOpenObject[sym][0];
            }
        }
        return assetsIsOpenObject;
    }
);

export const availableContractsSelector = createSelector(
    [state => state.tradingOptions, assetsIsOpenSelector],
    (tradingOptions, assetsIsOpen) =>
        tradingOptions
            .map((contract, symbol) => {
                // each immediate child refer to a type, eg Rise/Fall
                const contractTree = contractsPerSymbol(contract);

                // remove trade type without start later if market is closed
                return assetsIsOpen[symbol].isOpen ?
                    contractTree :
                    filterObjectBy(contractTree, obj =>
                        findIfExist(obj, descendent => descendent && !!descendent.forwardStartingDuration)
                    );
            })
);

export const tradesWithDetailsSelector = createSelector(
    [state => state.trades, assetsSelector, state => state.openContracts],
    (trades, assets, openContracts) =>
        trades.map(t => {
            const symbolDetails = assets.find(a => a.get('symbol') === t.get('symbol'));
            const pipSize = symbolDetails && symbolDetails.get('pip').length - 1;
            const symbolName = symbolDetails && symbolDetails.get('display_name');
            const tradeWithPipSize = t.set('pipSize', pipSize).set('symbolName', symbolName);
            const mostRecentContractId = t.get('mostRecentContractId');
            const mostRecentContractBought = mostRecentContractId && openContracts.get(mostRecentContractId);
            const tradeWithMostRecentTransaction =
                tradeWithPipSize.set('mostRecentContractBought', mostRecentContractBought);

            return tradeWithMostRecentTransaction;
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
