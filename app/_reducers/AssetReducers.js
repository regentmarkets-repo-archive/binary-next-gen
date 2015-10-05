import { Map } from 'immutable';
import { FILTER_ASSETS, SERVER_DATA_ACTIVE_SYMBOLS } from '../_constants/ActionTypes';

const initialState = new Map({
    list: [],
    tree: {},
    query: '',
    shownAssets: [],
});

const generateTree = (symbols) => {
    const tree = {};
    symbols.forEach((sym) => {
        if (!tree[sym.market_display_name]) tree[sym.market_display_name] = {};
        if (!tree[sym.market_display_name][sym.submarket_display_name]) tree[sym.market_display_name][sym.submarket_display_name] = {};
        tree[sym.market_display_name][sym.submarket_display_name][sym] = sym.display_name;
    });
    return new Map(tree);
};

const doFilter = (assetList, query) => {
    const queryLc = query.toLowerCase();
    return assetList.filter(m =>
        queryLc === '' ||
        m.get('symbol').toLowerCase().includes(queryLc) ||
        m.get('display_name').toLowerCase().includes(queryLc)
    );
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_ACTIVE_SYMBOLS: {
            const activeSymbols = action.serverResponse.data;

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
        default:
            return state;
    }
};
