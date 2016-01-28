import { Map } from 'immutable';

import {
    WORKSPACE_VIEW_ASSET_DETAILS,
    WORKSPACE_ASSET_SELECT,
    WORKSPACE_FAVOR_ASSET,
    WORKSPACE_UNFAVOR_ASSET,
    CHANGE_ACTIVE_TAB,
    UPDATE_TRADING_TIMES_SUBMARKET,
    UPDATE_TRADING_TIMES_DATE,
    UPDATE_ASSET_INDEX_SUBMARKET,
    UPDATE_WORKSPACE_FIELD,
} from '../_constants/ActionTypes';

const initialState = new Map({
    leftPanelSize: 350,
    leftActiveTab: 0,
    rightPanelSize: 350,
    rightActiveTab: 0,
    bottomPanelSize: 300,
    bottomActiveTab: 0,
    symbolSelected: 'R_100',
    tradingTimes: new Map({
        submarket: 'europe_africa',
        date: new Date(),
    }),
    assetIndex: new Map({
        submarketId: 'europe_africa',
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
            const newState = state.update('favoriteAssets', x => x.add(action.symbol));
            return newState;
        }
        case WORKSPACE_UNFAVOR_ASSET: {
            const newState = state.update('favoriteAssets', x => x.delete(action.symbol));
            return newState;
        }
        case UPDATE_TRADING_TIMES_SUBMARKET: {
            return state.update('tradingTimes', v => v.merge({ submarket: action.submarket }));
        }
        case UPDATE_TRADING_TIMES_DATE: {
            return state.update('tradingTimes', v => v.merge({ date: action.date }));
        }
        case UPDATE_ASSET_INDEX_SUBMARKET: {
            return state.update('assetIndex', v => v.merge({ submarketId: action.submarket }));
        }
        case UPDATE_WORKSPACE_FIELD: {
            return state.set(action.fieldName, action.fieldValue);
        }
        default:
            return state;
    }
};
