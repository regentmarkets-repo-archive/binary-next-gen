import { fromJS } from 'immutable';
import {
    SERVER_DATA_ACTIVE_SYMBOLS,
    SERVER_DATA_TRADING_TIMES,
    SERVER_DATA_ASSET_INDEX,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    tree: {},
    list: [],
    times: [],
    index: [],
});

const generateTree = symbols => {
    const tree = { };
    symbols.forEach(sym => {
        if (!tree[sym.market]) tree[sym.market] = { display_name: sym.market_display_name, submarkets: {} };

        if (!tree[sym.market].submarkets[sym.submarket]) {
            tree[sym.market].submarkets[sym.submarket] = { display_name: sym.submarket_display_name, symbols: {} };
        }
        if (!tree[sym.market].submarkets[sym.submarket].symbols[sym.symbol]) {
            tree[sym.market].submarkets[sym.submarket].symbols[sym.symbol] = { display_name: sym.display_name };
        }
    });
    return tree;
};


const flattenTradingTimes = tradingTimes => {
    return tradingTimes.markets
        .reduce((x, y) => x.concat(y.submarkets), [])
        .reduce((x, y) => x.concat(y.symbols), []);
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_ACTIVE_SYMBOLS: {
            const activeSymbols = action.serverResponse.active_symbols;

            return state.merge({
                list: activeSymbols,
                tree: generateTree(activeSymbols),
            });
        }
        case SERVER_DATA_TRADING_TIMES: {
            const flatTimes = flattenTradingTimes(action.serverResponse.trading_times);
            return state.set('times', flatTimes);
        }
        case SERVER_DATA_ASSET_INDEX: {
            return state.set('index', action.serverResponse.asset_index);
        }
        default:
            return state;
    }
};
