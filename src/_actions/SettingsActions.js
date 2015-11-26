import * as types from '../_constants/ActionTypes';

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

export const updatePersonalAddress = newAddress => ({
    type: types.UPDATE_PERSONAL_ADDRESS,
    newAddress,
});
