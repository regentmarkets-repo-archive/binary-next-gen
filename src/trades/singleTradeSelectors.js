import { fromJS } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { currencySelector, ticksSelector } from '../_store/directSelectors';
import {
    tradesWithDetailsSelector,
    availableContractsSelector,
    assetsIsOpenSelector,
} from '../fulltrade/FullTradeSelectors';


export const firstTradeSelector = createSelector(
    tradesWithDetailsSelector,
    trades => trades.first()
);

const marketIsOpen = createSelector(
    [assetsIsOpenSelector, firstTradeSelector],
    (assets, firstTrade) => {
        const firstTradeAsset = assets[firstTrade.getIn(['params', 'symbol'])];
        return firstTradeAsset && firstTradeAsset.isOpen;
    }
);

export const ticksForFirstTradeSelector = createSelector(
    [firstTradeSelector, ticksSelector],
    (trade, ticks) => ticks.get(trade.getIn(['params', 'symbol'])) || fromJS([])
);

export const singleContract = createSelector(
  [availableContractsSelector, firstTradeSelector],
  (contracts, trade) => contracts.get(trade.getIn(['params', 'symbol']))
);

export default createStructuredSelector({
    contract: singleContract,
    currency: currencySelector,
    marketIsOpen,
    params: state => firstTradeSelector(state).get('params'),
    pipSize: state => firstTradeSelector(state).get('pipSize'),
    proposalInfo: state => firstTradeSelector(state).get('proposalInfo'),
    purchaseInfo: state => firstTradeSelector(state).get('purchaseInfo'),
    uiState: state => firstTradeSelector(state).get('uiState'),
    tradingTime: state => firstTradeSelector(state).get('tradingTime'),    // TODO: rethink if this is correct
    ticks: ticksForFirstTradeSelector,
});
