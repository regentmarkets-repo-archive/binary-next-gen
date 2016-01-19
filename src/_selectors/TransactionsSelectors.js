import { createSelector } from 'reselect';
import { todayString, epochToDateString, getLastXMonthEpoch } from '../_utils/DateUtils';

export const transactionsSelector = state => state.transactions.toJS();

export const transactionsTotalSelector = createSelector(
    transactionsSelector,
    transactions =>
        transactions
            .map(t => +t.amount)
            .reduce((x, y) => x + y, 0),
);

export const transactionsTodaySelector = createSelector(
    transactionsSelector,
    transactions => {
        const today = todayString();
        return transactions.filter(tx => today === epochToDateString(tx.transaction_time));
    }
);

export const transactionsYesterdaySelector = createSelector(
    transactionsSelector,
    transactions => {
       const yesterday = epochToDateString((Date.now() / 1000) - 60 * 60 * 24);
       return transactions.filter(tx => yesterday === epochToDateString(tx.transaction_time));
   }
);

export const transactionsLast30DaysSelector = createSelector(
    transactionsSelector,
    transactions => {
        const last30DaysEpoch = getLastXMonthEpoch(1);
        return transactions.filter(tx => tx.transaction_time > last30DaysEpoch);
    }
);

export const transactionsLast60DaysSelector = createSelector(
    transactionsSelector,
    transactions => {
        const last60DaysEpoch = getLastXMonthEpoch(2);
        return transactions.filter(tx => tx.transaction_time > last60DaysEpoch);
    }
);

export default createSelector([
        transactionsSelector,
        transactionsTodaySelector,
        transactionsYesterdaySelector,
        transactionsLast30DaysSelector,
        transactionsLast60DaysSelector,
        transactionsTotalSelector,
    ], (
        transactions,
        transactionsToday,
        transactionsYesterday,
        transactionsLast30Days,
        transactionsLast60Days,
        transactionsTotal
    ) => ({
        transactions,
        transactionsToday,
        transactionsYesterday,
        transactionsLast30Days,
        transactionsLast60Days,
        transactionsTotal,
    }),
);
