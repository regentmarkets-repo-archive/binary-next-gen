import { createSelector } from 'reselect';
import {
    transactionsTodaySelector,
    transactionsYesterdaySelector,
    transactionsLast30DaysSelector,
    transactionsLast60DaysSelector,
} from './TransactionsSelectors';

export const currencySelector = state => state.account.get('currency');

export default createSelector([
        currencySelector,
        transactionsTodaySelector,
        transactionsYesterdaySelector,
        transactionsLast30DaysSelector,
        transactionsLast60DaysSelector,
    ], (
        currency,
        transactionsToday,
        transactionsYesterday,
        transactionsLast30Days,
        transactionsLast60Days,
    ) => ({
        currency,
        transactionsToday,
        transactionsYesterday,
        transactionsLast30Days,
        transactionsLast60Days,
    }),
);
