import {
    SERVER_DATA_BALANCE,
    SERVER_DATA_MARKETS,
    SERVER_DATA_OFFERINGS,
    SERVER_DATA_ACTIVE_SYMBOLS,
    SERVER_DATA_TRADING_TIMES,
    SERVER_DATA_STATEMENT
} from '../_constants/ActionTypes';

const initialState = {
    account: {},
    balances: [],
    markets: [],
    offerings: [],
    activeSymbols: [],
    transactions: [],
};

export default function serverData(state = initialState, action) {
    switch (action.type) {
        case SERVER_DATA_BALANCE: {
            return {
                ...state,
                balances: action.serverResponse.data.balance,
            };
        }
        case SERVER_DATA_MARKETS:
            return {
                ...state,
                markets: action.serverResponse.data.markets,
            };
        case SERVER_DATA_OFFERINGS:
            return {
                ...state,
                offerings: action.serverResponse.data.offerings,
            };
        case SERVER_DATA_ACTIVE_SYMBOLS: {
            const data = action.serverResponse.data;
            return {
                ...state,
                activeSymbols: Object.keys(data).map(x => data[x]),
            };
        }
        case SERVER_DATA_TRADING_TIMES: {
            const data = action.serverResponse.data.markets;
            return {
                ...state,
                tradingTimes: Object.keys(data).map(x => data[x]),
            };
        }
        case SERVER_DATA_STATEMENT: {
            return {
                ...state,
                transactions: action.serverResponse.data.transactions,
            };
        }
        default:
            return state;
    }
}
