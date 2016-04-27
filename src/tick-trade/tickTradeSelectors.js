import { createSelector, createStructuredSelector } from 'reselect';
import { ticksForFirstTradeSelector, firstTradeSelector } from '../trades/singleTradeSelectors';
import findDeep from 'binary-utils/lib/findDeep';
import { availableAssetsSelector, availableContractsSelector } from '../fulltrade/FullTradeSelectors';
import { currencySelector } from '../_store/directSelectors';

const tickAssetFilter = (assets, contracts) => {
    const tickAssets = Object.keys(assets).reduce((a, b) => {
        const temp = assets[b].filter(s => {
            const assetContract = contracts[s];
            if (!assetContract) {
                return true;
            }
            return findDeep(assetContract, o => Array.isArray(o) && o.unit === 't');
        });
        return a.concat(temp);
    }, []);

    return tickAssets;
};

export const tickTradesSelector = createSelector(
    firstTradeSelector,
    trade => {
        const tickAssets = tickAssetFilter(trade.assets, trade.contracts);
        const refTrade = trade;             // not entirely sure if this will create trouble
        refTrade.assets = tickAssets;
        return refTrade;
    }
);

export const tickAssetsSelector = createSelector(
    [availableAssetsSelector, availableContractsSelector],
    (assets, contracts) => tickAssetFilter(assets, contracts)
);

export default createStructuredSelector({
    assetsGrouped: availableAssetsSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    trade: firstTradeSelector,
    ticks: ticksForFirstTradeSelector,
    assets: tickAssetsSelector,
});
