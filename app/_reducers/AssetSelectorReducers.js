import { fromJS } from 'immutable';
import {
    SERVER_DATA_ACTIVE_SYMBOLS,
    FILTER_ASSETS,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    query: '',
    shownAssets: [],
});

const similarStr = (str1, str2) => str1.toLowerCase().includes(str2.toLowerCase());

const doFilter = (assetList, query) => {
    return assetList.filter(asset =>
        query === '' ||
        similarStr(asset.get('symbol'), query) ||
        similarStr(asset.get('display_name'), query) ||
        similarStr(asset.get('market_display_name'), query) ||
        similarStr(asset.get('submarket_display_name'), query)
    );
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_ACTIVE_SYMBOLS: {
            const activeSymbols = action.serverResponse.active_symbols;
            return state.merge({ shownAssets: activeSymbols });
        }
        case FILTER_ASSETS: {
            return state
                .set('query', action.query)
                .set('shownAssets', doFilter(action.assets, action.query));
        }
        default:
            return state;
    }
};
