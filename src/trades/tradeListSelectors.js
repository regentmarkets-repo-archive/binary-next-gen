import { createSelector, createStructuredSelector } from 'reselect';
import { currencySelector, ticksSelector, activeTradeIndexSelector } from '../_store/directSelectors';
import { tradesWithDetailsSelector, availableContractsSelector } from '../fulltrade/FullTradeSelectors';
import { assetPickerItemsSelector } from '../asset-picker/AssetPickerSelectors';
import { groupByKey } from '../_utils/ArrayUtils';

const assetsIsOpenSelector = createSelector(
    assetPickerItemsSelector,
    assetDetails => {
        const assetsIsOpen = assetDetails.map(a => ({ symbol: a.symbol, isOpen: a.isOpen }));
        return groupByKey(assetsIsOpen.toJS(), 'symbol');
    }
);

export default createStructuredSelector({
    assetsIsOpen: assetsIsOpenSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    trades: tradesWithDetailsSelector,
    ticksForAllSymbols: ticksSelector, // not really!!!
    activeTradeIndex: activeTradeIndexSelector,
});
