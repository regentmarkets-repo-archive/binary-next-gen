import { Map, Set } from 'immutable';
// import Perf from 'react-addons-perf';

import {
    WORKSPACE_VIEW_ASSET_DETAILS,
    WORKSPACE_ASSET_SELECT,
    WORKSPACE_FAVOR_ASSET,
    WORKSPACE_UNFAVOR_ASSET,
} from '../_constants/ActionTypes';

const initialState = new Map({
    symbolSelected: 'frxUSDJPY',
    favoriteAssets: Set.of('R_50', 'frxUSDJPY', 'RDBEAR'),
    tradingTimes: new Map({
        submarket: 'Asia/Oceania',
        date: new Date(),
    }),
});

export default (state = initialState, action) => {
    switch (action.type) {
        case WORKSPACE_VIEW_ASSET_DETAILS: {
            return state;
        }
        case WORKSPACE_ASSET_SELECT: {
            return state.set('symbolSelected', action.symbol);
        }
        case WORKSPACE_FAVOR_ASSET: {
            // Perf.start();
            // setTimeout(() => {
            //     Perf.stop();
            //     const measurements = Perf.getLastMeasurements();
            //     Perf.printInclusive(measurements);
            //     Perf.printWasted(measurements);
            // }, 10000);
            return state.update('favoriteAssets', x =>
                x.has(action.symbol) ? x.remove(action.symbol) : x.add(action.symbol));
        }
        case WORKSPACE_UNFAVOR_ASSET: {
            return state;
        }
        default:
            return state;
    }
};
