import { createSelector, createStructuredSelector } from 'reselect';
import {
    todayString,
    epochToDateString,
    yesterdayString,
    getLastXMonthEpoch,
    last7DaysEpoch,
} from '../_utils/DateUtils';
import { toPlainJS } from '../_utils/ObjectUtils';

export const transactionsSelector = state => toPlainJS(state.transactions);

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
       const yesterday = yesterdayString();
       return transactions.filter(tx => yesterday === epochToDateString(tx.transaction_time));
   }
);

export const transactionsLast7DaysSelector = createSelector(
    transactionsSelector,
    transactions => {
        const Last7DaysEpoch = last7DaysEpoch();
        return transactions.filter(tx => tx.transaction_time > Last7DaysEpoch);
    }
);

export const transactionsLast30DaysSelector = createSelector(
    transactionsSelector,
    transactions => {
        const Last30DaysEpoch = getLastXMonthEpoch(1);
        return transactions.filter(tx => tx.transaction_time > Last30DaysEpoch);
    }
);


export const transactionsTotalSelector = createSelector(
    transactionsSelector,
    transactions =>
        transactions
            .map(t => +t.amount)
            .reduce((x, y) => x + y, 0)
);

export default createStructuredSelector({
    transactions: transactionsSelector,
    transactionsToday: transactionsTodaySelector,
    transactionsYesterday: transactionsYesterdaySelector,
    transactionsLast7Days: transactionsLast7DaysSelector,
    transactionsLast30Days: transactionsLast30DaysSelector,
    transactionsTotal: transactionsTotalSelector,
});
