import { createStructuredSelector } from 'reselect';
import {
    transactionsTodaySelector,
    transactionsYesterdaySelector,
    transactionsLast7DaysSelector,
    transactionsLast30DaysSelector,
} from './TransactionsSelectors';

export const currencySelector = state => state.account.get('currency');

export default createStructuredSelector({
    currency: currencySelector,
    transactionsToday: transactionsTodaySelector,
    transactionsYesterday: transactionsYesterdaySelector,
    transactionsLast7Days: transactionsLast7DaysSelector,
    transactionsLast30Days: transactionsLast30DaysSelector,
});
