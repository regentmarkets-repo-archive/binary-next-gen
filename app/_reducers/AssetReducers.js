import { Map } from 'immutable';
import {
    FILTER_ASSETS,
    SERVER_DATA_ACTIVE_SYMBOLS,
    SERVER_DATA_TRADING_TIMES,
} from '../_constants/ActionTypes';

const initialState = new Map({
    list: [],
    times: [],
    tree: {},
    query: '',
    shownAssets: [],
});

const generateTree = symbols => {
    const tree = {};
    symbols.forEach((sym) => {
        if (!tree[sym.market_display_name]) tree[sym.market_display_name] = {};
        if (!tree[sym.market_display_name][sym.submarket_display_name]) tree[sym.market_display_name][sym.submarket_display_name] = {};
        tree[sym.market_display_name][sym.submarket_display_name][sym] = sym.display_name;
    });
    return new Map(tree);
};

const doFilter = (assetList, query, queryLc = query.toLowerCase()) => {
    return assetList.filter(asset =>
        queryLc === '' ||
        asset.get('symbol').toLowerCase().includes(queryLc) ||
        asset.get('display_name').toLowerCase().includes(queryLc)
    );
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
                query: '',
                shownAssets: activeSymbols,
            });
        }
        case FILTER_ASSETS: {
            return state
                .set('query', action.query)
                .set('shownAssets', doFilter(state.get('list'), action.query));
        }
        case SERVER_DATA_TRADING_TIMES: {
            const flatTimes = flattenTradingTimes(action.serverResponse.trading_times);
            return state.set('times', flatTimes);
        }
        default:
            return state;
    }
};
