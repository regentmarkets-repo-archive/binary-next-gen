import * as types from '../_constants/ActionTypes';
import { api } from '../_data/LiveData';

export const serverDataTickStream = serverResponse => ({
    type: types.SERVER_DATA_TICK_STREAM,
    serverResponse,
});

export const serverDataTickHistory = serverResponse => ({
    type: types.SERVER_DATA_TICK_HISTORY,
    serverResponse,
});

export const getTicksBySymbol = symbol =>
    (dispatch, getState) => {
        const { feedLicenses, ticks } = getState();
        const license = feedLicenses.get(symbol);
        if (!ticks.get(symbol)) {
            const syncTicksAndHistory = () => {
                const tickHistoryPromise =
                    api.getTickHistory(symbol, { end: 'latest', count: 60, adjust_start_time: 1 });
                api.subscribeToTick(symbol);
                return tickHistoryPromise;
            };
            const historyOnly =
                () => api.getTickHistory(symbol, { end: 'latest', count: 60, adjust_start_time: 1 });

            if (!license) {
                return syncTicksAndHistory();
            }

            switch (license) {
                case 'delayed': return historyOnly();
                case 'daily': return historyOnly();
                case 'chartonly':   // TODO: do nothing until backend tell us what to do
                    break;
                case 'realtime': return syncTicksAndHistory();
                default:console.warn(`Unknown license type: ${license}`);   // eslint-disable-line no-console
            }
        }
        return Promise.resolve();
    };

export const getTicksByCount = (symbol, count, subscribe = true) =>
    (dispatch, getState) => {
        const { ticks } = getState();
        if (subscribe && !ticks.get(symbol)) {
            return api
                .getTickHistory(symbol, { end: 'latest', count, adjust_start_time: 1, subscribe: 1 })
                .catch(err => {
                    const errCode = err.error.error.code;
                    if (errCode === 'StreamingNotAllowed') {
                        return undefined;             // swallow error, as nothing we can do
                    }
                    if (errCode === 'MarketIsClosed' || errCode === 'NoRealtimeQuotes') {
                        return api
                            .getTickHistory(symbol, { end: 'latest', count, adjust_start_time: 1 })
                            .catch(err2 => {
                                if (err2.error.error.code === 'StreamingNotAllowed') {
                                    return undefined;             // swallow error, as nothing we can do
                                }
                                return Promise.reject(err);
                            });
                    }
                    return Promise.reject(err);
                });
        }

        // having ticks implies already subscribe if subscribe is allowed
        if (ticks.get(symbol) && ticks.get(symbol).size < count) {
            return api.getTickHistory(symbol, { end: 'latest', count, adjust_start_time: 1 });
        }
        return Promise.resolve();
    };
