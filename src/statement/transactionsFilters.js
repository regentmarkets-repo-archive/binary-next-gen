import {
    todayUTCString,
    epochToUTCDateString,
    yesterdayUTCString,
    getLastXMonthEpoch,
    last7DaysEpoch,
} from '../_utils/DateUtils';

export const transactionsTodayFilterFunc = tx =>
    todayUTCString() === epochToUTCDateString(tx.transaction_time);

export const transactionsYesterdayFilterFunc = tx =>
       yesterdayUTCString() === epochToUTCDateString(tx.transaction_time);

export const transactionsLast7DaysFilterFunc = tx =>
    tx.transaction_time > last7DaysEpoch();

export const transactionsLast30DaysFilterFunc = tx =>
    tx.transaction_time > getLastXMonthEpoch(1);
