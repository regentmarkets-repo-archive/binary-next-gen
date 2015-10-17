import { fromJS } from 'immutable';
import {
    SERVER_DATA_ACTIVE_SYMBOLS,
    UPDATE_ASSET_SELECTOR_SEARCH_QUERY,
    UPDATE_ASSET_SELECTOR_SUBMARKET,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    query: '',
    submarket: '',
    shownAssets: [],
});

const similarStr = (str1, str2) => str1.toLowerCase().includes(str2.toLowerCase());

const doFilter = (assetList, query, submarket) => {
    return assetList.filter(asset =>
        (submarket === '' ||
            submarket === asset.get('submarket_display_name')) &&
        (query === '' ||
            similarStr(asset.get('symbol'), query) ||
            similarStr(asset.get('display_name'), query) ||
            similarStr(asset.get('market_display_name'), query) ||
            similarStr(asset.get('submarket_display_name'), query))
    );
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_ACTIVE_SYMBOLS: {
            const activeSymbols = action.serverResponse.active_symbols;
            return state.merge({ shownAssets: activeSymbols });
        }
        case UPDATE_ASSET_SELECTOR_SEARCH_QUERY: {
            return state
                .set('query', action.query)
                .set('shownAssets', doFilter(action.assets, action.query, state.get('submarket')));
        }
        case UPDATE_ASSET_SELECTOR_SUBMARKET: {
            return state
                .set('submarket', action.submarket)
                .set('shownAssets', doFilter(action.assets, state.get('query'), action.submarket));
        }
        default:
            return state;
    }
};
