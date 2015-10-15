import * as types from '../_constants/ActionTypes';

export function filterAssets(assets, query) {
    return {
        type: types.FILTER_ASSETS,
        assets,
        query,
    };
}
