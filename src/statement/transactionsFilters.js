import {
    todayUTCString,
    epochToUTCDateString,
    yesterdayUTCString,
    getLastXMonthEpoch,
    last7DaysEpoch,
} from 'binary-utils/lib/DateUtils';

export const transactionsTodayFilterFunc = tx =>
    todayUTCString() === epochToUTCDateString(tx.get('transaction_time'));

export const transactionsYesterdayFilterFunc = tx =>
    yesterdayUTCString() === epochToUTCDateString(tx.get('transaction_time'));

export const transactionsLast7DaysFilterFunc = tx =>
    tx.get('transaction_time') > last7DaysEpoch();

export const transactionsLast30DaysFilterFunc = tx =>
    tx.get('transaction_time') > getLastXMonthEpoch(1);

export const transactionsNoFilterFunc = () => true;

export default [
    transactionsTodayFilterFunc,
    transactionsYesterdayFilterFunc,
    transactionsLast7DaysFilterFunc,
    transactionsLast30DaysFilterFunc,
    transactionsNoFilterFunc,
];
