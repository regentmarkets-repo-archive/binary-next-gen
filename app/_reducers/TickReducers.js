import {
    SERVER_DATA_TICK_STREAM,
    SERVER_DATA_TICK_HISTORY
} from '../_constants/ActionTypes';

const initialState = {
    ticks: [],
};

export default function serverData(state = initialState, action) {
    switch (action.type) {
        case SERVER_DATA_TICK_STREAM: {
            const symbol = action.serverResponse.echo.ticks;
            if (!state.ticks[symbol]) {
                return {
                    ...state,
                    ticks: [{
                        history: [],
                    }],
                };
            }
            this.ticks[data.symbol].history.push({
                epoch: action.serverResponse.data.epoch,
                quote: action.serverResponsedata.quote,
            });

            return {
                ...state,
                ticks: action.serverResponse.data,
            };
        }
        case SERVER_DATA_TICK_HISTORY: {
            return {
                ...state,
                ticks: action.serverResponse.data,
            };
        }
        default:
            return state;
    }
}
