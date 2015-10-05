import { fromJS } from 'immutable';
import { FILTER_ASSETS, UPDATE_ASSETS, SERVER_DATA_ACTIVE_SYMBOLS } from '../_constants/ActionTypes';

const initialState = fromJS({
    active: [],
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

export default (state = initialState, action) => {
    const doFilter = (assets = state.allAssets, query = state.query) => {
        const queryLc = query.toLowerCase();
        return markets.filter(m =>
            queryLc === '' ||
            m.id.toLowerCase().includes(queryLc) ||
            m.name.toLowerCase().includes(queryLc)
        );
    };

    switch (action.type) {
        case SERVER_DATA_ACTIVE_SYMBOLS: {
            const activeSymbols = action.serverResponse.data;
            return state
                .set('active', activeSymbols)
                .set('tree', generateTree(activeSymbols));
        }
        case FILTER_ASSETS:
            return {
                ...state,
                shownAssets: doFilter(state.markets, action.query),
                query: action.query,
            };
        case UPDATE_ASSETS:
            return {
                ...state,
                shownAssets: doFilter(state.markets, action.query),
                query: action.query,
            };
        default:
            return state;
    }
};
