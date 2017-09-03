import { fromJS } from 'immutable';
import {
    CHANGE_SETTINGS_ACTIVE_TAB,
    SERVER_DATA_ACCOUNT_LIMITS,
    SERVER_DATA_ACCOUNT_SELF_EXCLUSION,
    SERVER_DATA_CASHIER_LOCK,
    SERVER_DATA_ACCOUNT_SETTINGS,
    UPDATE_SETTINGS_FIELD,
    REMOVE_PERSONAL_DATA,
    SERVER_DATA_CHANGE_PASSWORD,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    activeTab: 0,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SETTINGS_ACTIVE_TAB: {
            return state.set('activeTab', action.activeTabIndex);
        }
        case SERVER_DATA_ACCOUNT_LIMITS: {
            return state.merge(action.serverResponse.get_limits);
        }
        case SERVER_DATA_ACCOUNT_SELF_EXCLUSION: {
            return state.merge(action.serverResponse.get_self_exclusion);
        }
        case SERVER_DATA_CASHIER_LOCK: {
            return state.set('cashier_password', action.serverResponse.cashier_password);
        }
        case SERVER_DATA_ACCOUNT_SETTINGS: {
            return state.merge(action.serverResponse.get_settings);
        }
        case UPDATE_SETTINGS_FIELD: {
            return state.merge(action.settings);
        }
        case SERVER_DATA_CHANGE_PASSWORD: {
            return state.set('change_password', action.serverResponse.change_password);
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default:
            return state;
    }
};
