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
    CHANGE_ACTIVE_WORKSPACE_TAB,
    CHANGE_WORKSPACE_PANEL_SIZE,
    TOGGLE_TRADE_MODE,
    TOGGLE_PANEL,
} from '../_constants/ActionTypes';

const initialState = new Map({
    leftPanelVisible: true,
    leftPanelSize: 250,
    leftActiveTab: 0,
    rightPanelVisible: true,
    rightPanelSize: 320,
    rightActiveTab: 0,
    tradeMode: 'grid',
    symbolSelected: 'R_100',
    tradingTimes: new Map({
        submarket: 'europe_africa',
        date: new Date(),
    }),
    assetIndex: new Map({
        submarketId: 'europe_africa',
    }),
    transactionsFilter: 0,
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
        case CHANGE_ACTIVE_WORKSPACE_TAB: {
            return state
                .set(action.panel + 'ActiveTab', action.index)
                .set(action.panel + 'PanelVisible', true);
        }
        case CHANGE_WORKSPACE_PANEL_SIZE: {
            return state
                .set(action.panel + 'PanelSize', action.size > 100 ? action.size : 100)
                .set(action.panel + 'PanelVisible', action.size > 100);
        }
        case TOGGLE_TRADE_MODE: {
            const newTradeMode = state.get('tradeMode') === 'grid' ? 'tabs' : 'grid';
            return state.set('tradeMode', newTradeMode);
        }
        case TOGGLE_PANEL: {
            const panelField = action.panel + 'PanelVisible';
            return state.set(panelField, !state.get(panelField));
        }
        default:
            return state;
    }
};
