import { fromJS } from 'immutable';
import {
    CHANGE_SETTINGS_ACTIVE_TAB,
    SERVER_DATA_ACCOUNT_LIMITS,
    SERVER_DATA_ACCOUNT_SELF_EXCLUSION,
    SERVER_DATA_ACCOUNT_SETTINGS,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    activeTab: 0,
    limits: {},
    selfExclusion: {},
    personal: {},
});

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SETTINGS_ACTIVE_TAB: {
            return state.set('activeTab', action.activeTabIndex);
        }
        case SERVER_DATA_ACCOUNT_LIMITS: {
            return state.set('limits', action.serverResponse.get_limits);
        }
        case SERVER_DATA_ACCOUNT_SELF_EXCLUSION: {
            return state.set('selfExclusion', action.serverResponse.get_self_exclusion);
        }
        case SERVER_DATA_ACCOUNT_SETTINGS: {
            return state.set('personal', action.serverResponse.get_settings);
        }
        default:
            return state;
    }
};
