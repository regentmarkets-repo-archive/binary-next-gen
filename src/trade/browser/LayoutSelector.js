import { createStructuredSelector } from 'reselect';
import {
    tradesCountSelector,
    layoutNSelector,
} from '../../_store/directSelectors';

export const layoutSelector = createStructuredSelector({
    tradesCount: tradesCountSelector,
    layoutN: layoutNSelector,
});
