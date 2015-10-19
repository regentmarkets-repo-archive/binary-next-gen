import { Map, Set } from 'immutable';
import LiveData from '../_data/LiveData';
// import Perf from 'react-addons-perf';

import {
    WORKSPACE_VIEW_ASSET_DETAILS,
    WORKSPACE_ASSET_SELECT,
    WORKSPACE_FAVOR_ASSET,
    WORKSPACE_UNFAVOR_ASSET,
    UPDATE_TRADING_TIMES_SUBMARKET,
    UPDATE_TRADING_TIMES_DATE,
    UPDATE_ASSET_INDEX_SUBMARKET,
} from '../_constants/ActionTypes';

const initialState = new Map({
    symbolSelected: '...',
    favoriteAssets: Set.of(),
    tradingTimes: new Map({
        submarket: 'Asia/Oceania',
        date: new Date(),
    }),
    assetIndex: new Map({
        submarket: 'Asia/Oceania',
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
            const newState = state.update('favoriteAssets', x =>
                x.has(action.symbol) ? x.remove(action.symbol) : x.add(action.symbol));
            LiveData.instance().trackSymbols(newState.get('favoriteAssets').toJS());
            return newState;
        }
        case WORKSPACE_UNFAVOR_ASSET: {
            return state;
        }
        case UPDATE_TRADING_TIMES_SUBMARKET: {
            return state.merge({ tradingTimes: { submarket: action.submarket }});
        }
        case UPDATE_TRADING_TIMES_DATE: {
            return state.merge({ tradingTimes: { date: action.date }});
        }
        case UPDATE_ASSET_INDEX_SUBMARKET: {
            return state.merge({ assetIndex: { submarket: action.submarket }});
        }
        default:
            return state;
    }
};
