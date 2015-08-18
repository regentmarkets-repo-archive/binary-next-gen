import {
    SERVER_DATA_FOR_AUTHORIZE,
    SERVER_DATA_FOR_MARKETS,
    SERVER_DATA_FOR_OFFERINGS,
    SERVER_DATA_FOR_ACTIVE_SYMBOLS
} from '../_constants/ActionTypes';

const initialState = {
    balance: {},
    markets: [],
    offerings: [],
    activeSymbols: [],
};

export default function serverData(state = initialState, action) {
    switch (action.type) {
        case SERVER_DATA_FOR_AUTHORIZE: {
            const data = action.serverResponse.data;
            return {
                ...state,
                balance: {
                    currency: data.currency,
                    amount: +data.balance,
                },
            };
        }
        case SERVER_DATA_FOR_MARKETS:
            return {
                ...state,
                markets: action.serverResponse.data.markets,
            };
        case SERVER_DATA_FOR_OFFERINGS:
            return {
                ...state,
                offerings: action.serverResponse.data.offerings,
            };
        case SERVER_DATA_FOR_ACTIVE_SYMBOLS: {
            const data = action.serverResponse.data;
            return {
                ...state,
                activeSymbols: Object.keys(data).map(x => data[x]),
            };
        }
        default:
            return state;
    }
}
