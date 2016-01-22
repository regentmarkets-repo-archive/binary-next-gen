import { fromJS } from 'immutable';
import {
    CHANGE_SETTINGS_ACTIVE_TAB,
    SERVER_DATA_ACCOUNT_LIMITS,
    SERVER_DATA_ACCOUNT_SELF_EXCLUSION,
    SERVER_DATA_ACCOUNT_SETTINGS,
    UPDATE_SETTINGS_FIELD,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    activeTab: 0,
    language: 'EN',
    theme: 'light',
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
        case SERVER_DATA_ACCOUNT_SETTINGS: {
            return state.merge(action.serverResponse.get_settings);
        }
        case UPDATE_SETTINGS_FIELD: {
            return state.merge(action.settings);
        }
        default:
            return state;
    }
};

export const getSettings = state => state.settings.toJS();
