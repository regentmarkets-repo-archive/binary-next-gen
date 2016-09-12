import { api } from './LiveData';

export const fetch1000Ticks = (symbol, end, count = 3000) =>
    api.getTickHistory(symbol, {
        count,
        end,
    }).then(r => {
        const { times, prices } = r.history;
        return times.map((t, idx) => {
            const quote = prices[idx];
            return { epoch: +t, quote: +quote };
        });
    });

export const fetch1000Candles = (symbol, end, interval, count = 1000) =>
    api.getTickHistory(symbol, {
        count,
        end,
        style: 'candles',
        granularity: interval,
    }).then(r => r.candles);

