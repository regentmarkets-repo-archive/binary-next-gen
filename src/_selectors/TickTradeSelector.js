import { createSelector } from 'reselect';
import { fullTradesSelector } from './FullTradeSelector';
import { findIfExist } from '../_utils/ObjectUtils';

const tickAssetFilter = (assets, contracts) => {
    const tickAssets = assets.filter(a => {
        const assetContract = contracts[a];
        if (!assetContract) {
            return true;
        }
        return findIfExist(assetContract, o => Array.isArray(o) && o.unit === 't');
    });

    return tickAssets;
};

export const tickTradesSelector = createSelector(
    fullTradesSelector,
    trade => {
        const tickAssets = tickAssetFilter(trade.assets, trade.contracts);
        const cloneTrade = trade;
        cloneTrade.assets = tickAssets;
        return cloneTrade;
    }
);
