import {
    SERVER_DATA_FOR_AUTHORIZE,
    SERVER_DATA_FOR_MARKETS,
    SERVER_DATA_FOR_OFFERINGS,
    SERVER_DATA_FOR_ACTIVE_SYMBOLS,
    SERVER_DATA_FOR_TRADING_TIMES,
    SERVER_DATA_FOR_PORTFOLIO,
    SERVER_DATA_FOR_STATEMENT
} from '../_constants/ActionTypes';

const initialState = {
    balance: {},
    markets: [],
    offerings: [],
    activeSymbols: [],
    transactions: [],
    contracts: [],
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
        case SERVER_DATA_FOR_TRADING_TIMES: {
            const data = action.serverResponse.data.markets;
            return {
                ...state,
                tradingTimes: Object.keys(data).map(x => data[x]),
            };
        }
        case SERVER_DATA_FOR_PORTFOLIO: {
            window.console.log('SERVER_DATA_FOR_PORTFOLIO', action);

            const contracts = state.contracts.slice();
            const newContract = action.serverResponse.data;
            const entry = contracts.find(c => c.id === newContract.id);

            if (!entry) {
                contracts.push(newContract);
            } else {
                Object.assign(entry, newContract);
            }

            /*
            const data = action.serverResponse.data.markets;
            const entry = this.portfolio.find(c => c.id === r.data.id);
            */
            return {
                ...state,
                contracts,
                // totals: {
                //     purchase: contracts.length && contracts.reduce((x, y) => x + +y.buy_price, 0),
                //     indicative: contracts.length && contracts.reduce((x, y) => x + +y.buy_price, 0),
                // },
            };
        }
        case SERVER_DATA_FOR_STATEMENT: {
            return {
                ...state,
                transactions: action.serverResponse.data.transactions,
            };
        }
        default:
            return state;
    }
}
