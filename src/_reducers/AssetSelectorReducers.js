import { fromJS } from 'immutable';
import {
    SERVER_DATA_ACTIVE_SYMBOLS,
    UPDATE_ASSET_SELECTOR_SEARCH_QUERY,
    UPDATE_ASSET_SELECTOR_MARKETS,
    UPDATE_ASSET_SELECTOR_SUBMARKET,
    SERVER_DATA_ASSET_INDEX,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    query: '',
    markets: [],
    submarket: '',
    shownAssets: [],
    availableAssets: [],
});

const similarStr = (str1, str2) => str1.toLowerCase().includes(str2.toLowerCase());

const doFilter = (AssetSelectorList, query, markets, submarket) => {
    return AssetSelectorList.filter(asset =>
        (submarket === '' ||
            submarket === asset.get('submarket_display_name')) &&
        (query === '' ||
            similarStr(asset.get('symbol'), query) ||
            similarStr(asset.get('display_name'), query) ||
            similarStr(asset.get('market_display_name'), query) ||
            similarStr(asset.get('submarket_display_name'), query))
    ).sort((x1, x2) => x1.get('display_name').localeCompare(x2.get('display_name')));
};

const hasTick = assets => {
    const withTicks = assets.filter(asset => {
        return asset[2].includes('t');
    });
    return withTicks.length > 0;
};

const tickTradeFilter = assetIndex => {
    const symbolWithTick = assetIndex.filter(asset => {
        return hasTick(asset[2]);
    }).map(asset => asset[0]);
    return symbolWithTick;
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_ACTIVE_SYMBOLS: {
            const activeSymbols = action.serverResponse.active_symbols;
            const filteredSymbols = state.get('tickOnly') ? activeSymbols.filter(asset => {
                return state.get('tickOnly').indexOf(asset.symbol) > -1;
            }) : activeSymbols;
            return state
                .set('availableAssets', fromJS(filteredSymbols))
                .set('shownAssets', fromJS(filteredSymbols));
        }
        case UPDATE_ASSET_SELECTOR_SEARCH_QUERY: {
            const availableAssets = state.get('availableAssets');
            const shownAssets = doFilter(availableAssets, action.query, state.get('market'), state.get('submarket'));

            return state
                .set('query', action.query)
                .set('shownAssets', shownAssets);
        }
        case UPDATE_ASSET_SELECTOR_SUBMARKET: {
            const availableAssets = state.get('availableAssets');
            const shownAssets = doFilter(availableAssets, state.get('query'), state.get('market'), action.submarket);

            return state
                .set('submarket', action.submarket)
                .set('shownAssets', shownAssets);
        }
        case UPDATE_ASSET_SELECTOR_MARKETS: {
            const availableAssets = state.get('availableAssets');
            const shownAssets = doFilter(availableAssets, state.get('query'), action.markets, state.get('submarket'));

            return state
                .set('markets', fromJS(action.markets))
                .set('shownAssets', shownAssets);
        }
        case SERVER_DATA_ASSET_INDEX: {
            const symbolWithTick = tickTradeFilter(action.serverResponse.asset_index);
            const shownAssetsWithTick = state.get('availableAssets').filter(asset => {
                return symbolWithTick.indexOf(asset.get('symbol')) > -1;
            });
            return state
                .set('tickOnly', symbolWithTick)
                .set('shownAssets', shownAssetsWithTick)
                .set('availableAssets', shownAssetsWithTick);
        }
        default:
            return state;
    }
};
