import { createStructuredSelector } from 'reselect';
import { currencySelector, ticksSelector } from '../_store/directSelectors';

import {
    tradesWithDetailsSelector,
    availableAssetsSelector,
    availableContractsSelector,
} from '../fulltrade/FullTradeSelectors';

export default createStructuredSelector({
    assetsGrouped: availableAssetsSelector,
    contracts: availableContractsSelector,
    currency: currencySelector,
    trades: tradesWithDetailsSelector,
    ticks: ticksSelector, // not really!!!
    isAuthorized: state => (state.appState.get('authorized')),
});
