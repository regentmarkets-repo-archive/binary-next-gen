import { tradesCountSelector } from '../../_store/directSelectors';
import { createSelector, createStructuredSelector } from 'reselect';

const tradeListSelector = createSelector(
    [tradesCountSelector]
);
