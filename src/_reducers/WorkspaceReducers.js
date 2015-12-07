import { Map, Set } from 'immutable';
// import Perf from 'react-addons-perf';

import {
    WORKSPACE_VIEW_ASSET_DETAILS,
    WORKSPACE_ASSET_SELECT,
    WORKSPACE_FAVOR_ASSET,
    WORKSPACE_UNFAVOR_ASSET,
    CHANGE_ACTIVE_TAB,
    UPDATE_TRADING_TIMES_SUBMARKET,
    UPDATE_TRADING_TIMES_DATE,
    UPDATE_ASSET_INDEX_SUBMARKET,
} from '../_constants/ActionTypes';

const initialState = new Map({
    leftPanelSize: 350,
    leftActiveTab: 0,
    rightPanelSize: 350,
    rightActiveTab: 0,
    bottomPanelSize: 300,
    bottomActiveTab: 0,
    symbolSelected: 'R_100',
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
        case CHANGE_ACTIVE_TAB: {
            return state.set(action.panel + 'ActiveTab', action.index);
        }
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
            const newState = state.update('favoriteAssets', x => x.add(action.symbol));
            // LiveData.trackSymbols(newState.get('favoriteAssets').toJS());
            return newState;
        }
        case WORKSPACE_UNFAVOR_ASSET: {
            const newState = state.update('favoriteAssets', x => x.delete(action.symbol));
            // LiveData.trackSymbols(newState.get('favoriteAssets').toJS());
            return newState;
        }
        case UPDATE_TRADING_TIMES_SUBMARKET: {
            return state.merge({ tradingTimes: { submarket: action.submarket } });
        }
        case UPDATE_TRADING_TIMES_DATE: {
            return state.merge({ tradingTimes: { date: action.date } });
        }
        case UPDATE_ASSET_INDEX_SUBMARKET: {
            return state.merge({ assetIndex: { submarket: action.submarket } });
        }
        default:
            return state;
    }
};
