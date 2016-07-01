import { tradesCountSelector, layoutNSelector } from '../../_store/directSelectors';
import { createStructuredSelector } from 'reselect';

export const layoutSelector = createStructuredSelector({
    tradesCount: tradesCountSelector,
    layoutN: layoutNSelector,
});
