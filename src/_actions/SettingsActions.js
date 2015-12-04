import * as types from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';

export const changeSettingsActiveTab = activeTabIndex => ({
    type: types.CHANGE_SETTINGS_ACTIVE_TAB,
    activeTabIndex,
});

export const serverDataAccountLimits = serverResponse => ({
    type: types.SERVER_DATA_ACCOUNT_LIMITS,
    serverResponse,
});

export const serverDataAccountSelfExclusion = serverResponse => ({
    type: types.SERVER_DATA_ACCOUNT_SELF_EXCLUSION,
    serverResponse,
});

export const serverDataAccountSettings = serverResponse => ({
    type: types.SERVER_DATA_ACCOUNT_SETTINGS,
    serverResponse,
});

export const updateSettingFields = settings => ({
    type: types.UPDATE_SETTINGS_FIELD,
    settings,
});

export const attemptUpdateSettings = (settings, errorHandler) => {
    return dispatch => {
        LiveData.api
            .setAccountSettings(settings)
            .then(() => dispatch(updateSettingFields(settings)))
            .catch(errorHandler);
    };
};

export const attemptUpdateSelfExclusion = (exclusions, errorHandler) => {
    return dispatch => {
        LiveData.api
            .setSelfExclusion(exclusions)
            .then(() => dispatch(updateSettingFields(exclusions)))
            .catch(errorHandler);
    };
};
