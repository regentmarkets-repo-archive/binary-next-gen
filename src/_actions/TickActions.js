import * as types from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';

export const serverDataTickStream = serverResponse => ({
    type: types.SERVER_DATA_TICK_STREAM,
    serverResponse,
});

export const serverDataTickHistory = serverResponse => ({
    type: types.SERVER_DATA_TICK_HISTORY,
    serverResponse,
});

export const serverDataCandles = serverResponse => ({
    type: types.SERVER_DATA_CANDLES,
    serverResponse,
});

export const getTicksBySymbol = symbol =>
    (dispatch, getState) => {
        const { feedLicenses, ticks } = getState();
        const license = feedLicenses.get(symbol);
        if (!ticks.get(symbol)) {
            const syncTicksAndHistory = () => {
                const tickHistoryPromise =
                    LiveData.api.getTickHistory(symbol, { end: 'latest', count: 60, adjust_start_time: 1 });
                const tickStreamPromise =
                    LiveData.api.subscribeToTick(symbol);

                return Promise.all([tickHistoryPromise, tickStreamPromise]);
            };
            const historyOnly =
                () => LiveData.api.getTickHistory(symbol, { end: 'latest', count: 60, adjust_start_time: 1 });

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
