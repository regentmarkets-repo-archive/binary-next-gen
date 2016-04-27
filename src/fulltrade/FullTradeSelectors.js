import { createSelector } from 'reselect';
import nowAsEpoch from 'binary-utils/lib/nowAsEpoch';
import { assetsSelector, tradingTimesSelector, boughtContractsSelector } from '../_store/directSelectors';
import { marketTreeSelector } from '../_selectors/marketTreeSelector';
import extractBarrier from 'binary-utils/lib/extractBarrier';
import extractDuration from 'binary-utils/lib/extractDuration';
import extractForwardStartingDuration from 'binary-utils/lib/extractForwardStartingDuration';
import extractSpreadInfo from 'binary-utils/lib/extractSpreadInfo';
import availableAssetsFilter from 'binary-utils/lib/availableAssetsFilter';
import flattenSubmarkets from 'binary-utils/lib/flattenSubmarkets';
import normalizedContractFor from 'binary-utils/lib/normalizedContractFor';
import groupByKey from 'binary-utils/lib/groupByKey';
import findDeep from 'binary-utils/lib/findDeep';
import filterObjectBy from 'binary-utils/lib/filterObjectBy';
import pipsToDigits from 'binary-utils/lib/pipsToDigits';

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
    assetsSelector,
    assets => {
        const assetsIsOpen = assets.map(a => ({ symbol: a.get('symbol'), isOpen: !!a.get('exchange_is_open') }));
        const assetsIsOpenObject = groupByKey(assetsIsOpen.toJS(), 'symbol');
        Object.keys(assetsIsOpenObject).forEach(symbol => {
            if (assetsIsOpenObject[symbol]) {
                assetsIsOpenObject[symbol] = assetsIsOpenObject[symbol][0];
            }
        });
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
                return assetsIsOpen[symbol] && assetsIsOpen[symbol].isOpen ?
                    contractTree :
                    filterObjectBy(contractTree, obj =>
                        findDeep(obj, descendent => descendent && !!descendent.forwardStartingDuration)
                    );
            })
);

export const tradesWithDetailsSelector = createSelector(
    [state => state.trades, assetsSelector, boughtContractsSelector],
    (trades, assets, boughtContracts) =>
        trades.map(t => {
            const symbolDetails = assets.find(a => a.get('symbol') === t.get('symbol'));
            const pipSize = symbolDetails && pipsToDigits(symbolDetails.get('pip'));
            const symbolName = symbolDetails && symbolDetails.get('display_name');
            const tradeWithPipSize = t.set('pipSize', pipSize).set('symbolName', symbolName);
            const mostRecentContractId = t.get('mostRecentContractId');
            const lastBoughtContract = mostRecentContractId && boughtContracts.get(mostRecentContractId);
            const tradeWithMostRecentTransaction =
                tradeWithPipSize.set('lastBoughtContract', lastBoughtContract);

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
