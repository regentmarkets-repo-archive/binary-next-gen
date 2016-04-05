import { fromJS } from 'immutable';
import {
    // SERVER_DATA_ACTIVE_SYMBOLS,
    UPDATE_ASSET_PICKER_SEARCH_QUERY,
    UPDATE_ASSET_PICKER_MARKETS,
    UPDATE_ASSET_PICKER_SUBMARKET,
    UPDATE_ASSET_PICKER_FILTER,
    // SERVER_DATA_ASSET_INDEX,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    query: '',
    filter: 'all',
});

export default (state = initialState, action) => {
    switch (action.type) {
        // case SERVER_DATA_ACTIVE_SYMBOLS: {
        //     const activeSymbols = action.serverResponse.active_symbols;
        //     const filteredSymbols = state.get('tickOnly') ? activeSymbols.filter(asset =>
        //         state.get('tickOnly').indexOf(asset.symbol) > -1
        //     ) : activeSymbols;
        //
        //     return state
        //         .set('availableAssets', fromJS(filteredSymbols));
        // }
        case UPDATE_ASSET_PICKER_SEARCH_QUERY: {
            return state
                .set('query', action.query);
        }
        case UPDATE_ASSET_PICKER_SUBMARKET: {
            return state
                .set('submarket', action.submarket);
        }
        case UPDATE_ASSET_PICKER_MARKETS: {
            return state
                .set('markets', fromJS(action.markets));
        }
        case UPDATE_ASSET_PICKER_FILTER: {
            return state.set('filter', action.filter);
        }
        // case SERVER_DATA_ASSET_INDEX: {
        //     const symbolWithTick = tickTradeFilter(action.serverResponse.asset_index);
        //     const shownAssetsWithTick = state.get('availableAssets').filter(asset =>
        //         symbolWithTick.indexOf(asset.symbol) > -1
        //     );
        //     return state
        //         .set('tickOnly', symbolWithTick)
        //         .set('shownAssets', shownAssetsWithTick)
        //         .set('availableAssets', shownAssetsWithTick);
        // }
        default:
            return state;
    }
};
