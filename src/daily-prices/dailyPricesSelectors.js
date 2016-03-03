import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
    dailyPrices: () => [{
        date: new Date(),
        open: 123,
        high: 234,
        low: 100,
        close: 345,
    }, {
        date: new Date().setDate(new Date().getDate() - 1),
        open: 123,
        high: 234,
        low: 100,
        close: 345,
    }, {
        date: new Date().setDate(new Date().getDate() - 2),
        open: 123,
        high: 234,
        low: 100,
        close: 345,
    }],
});
