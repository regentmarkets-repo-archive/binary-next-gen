import { createSelector } from 'reselect';
import { fullTradesSelector } from './FullTradeSelector';
import { findIfExist } from '../_utils/ObjectUtils';

const tickAssetFilter = (assets, contracts) => {
    const tickAssets = Object.keys(assets).reduce((a, b) => {
        const temp = assets[b].filter(s => {
            const assetContract = contracts[s];
            if (!assetContract) {
                return true;
            }
            return findIfExist(assetContract, o => Array.isArray(o) && o.unit === 't');
        });
        return a.concat(temp);
    }, []);

    return tickAssets;
};

export const tickTradesSelector = createSelector(
    fullTradesSelector,
    trade => {
        const tickAssets = tickAssetFilter(trade.assets, trade.contracts);
        const refTrade = trade;             // not entirely sure if this will create trouble
        refTrade.assets = tickAssets;
        return refTrade;
    }
);
