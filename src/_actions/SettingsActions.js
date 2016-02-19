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

export const serverDataCashierLock = serverResponse => ({
    type: types.SERVER_DATA_CASHIER_LOCK,
    serverResponse,
});

export const serverDataChangePassword = serverResponse => ({
    type: types.SERVER_DATA_CHANGE_PASSWORD,
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
