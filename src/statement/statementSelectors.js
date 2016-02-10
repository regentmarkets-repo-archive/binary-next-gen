import { Record } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { epochToDate } from '../_utils/DateUtils';
import {
    currencySelector,
    transactionsSelector,
    transactionsFilterSelector,
} from '../_store/directSelectors';
import {
    transactionsTodayFilterFunc,
    transactionsYesterdayFilterFunc,
    transactionsLast7DaysFilterFunc,
    transactionsLast30DaysFilterFunc,
} from './transactionsFilters';

const filters = [
    transactionsTodayFilterFunc,
    transactionsYesterdayFilterFunc,
    transactionsLast7DaysFilterFunc,
    transactionsLast30DaysFilterFunc,
];

const StatementRecord = new Record({
    ref: 0,
    date: 0,
    actionType: '',
    amount: 0,
    balanceAfter: 0,
});

export const filteredTransactionsSelector = createSelector(
    [transactionsSelector, transactionsFilterSelector],
    (transactions, filterIdx) =>
        transactions.filter(filters[filterIdx])
            .map(t => new StatementRecord({
                ref: t.transaction_id,
                date: epochToDate(t.transaction_time),
                actionType: t.action_type,
                amount: t.amount,
                balanceAfter: t.balance_after,
            })),
);

export const transactionsTotalSelector = createSelector(
    filteredTransactionsSelector,
    filteredTransactions =>
        filteredTransactions
            .map(t => +t.amount)
            .reduce((x, y) => x + y, 0)
);

export default createStructuredSelector({
    currency: currencySelector,
    transactionsFilter: transactionsFilterSelector,
    transactions: filteredTransactionsSelector,
});
