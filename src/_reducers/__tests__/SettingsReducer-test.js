import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import settingsReducer from '../SettingsReducer';
import {
    CHANGE_SETTINGS_ACTIVE_TAB,
    SERVER_DATA_ACCOUNT_LIMITS,
    SERVER_DATA_ACCOUNT_SELF_EXCLUSION,
    SERVER_DATA_ACCOUNT_SETTINGS,
    SERVER_DATA_CASHIER_LOCK,
    UPDATE_SETTINGS_FIELD,
    REMOVE_PERSONAL_DATA,
} from '../../_constants/ActionTypes';

describe('settingsReducer', () => {
    it('should be able to set or select active tab by index', () => {
        const action = {
            type: CHANGE_SETTINGS_ACTIVE_TAB,
            activeTabIndex: 2,
        };
        const stateBefore = fromJS({ activeTab: 0 });
        const expectedState = fromJS({ activeTab: 2 });

        const actualState = settingsReducer(stateBefore, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should be able to update account limits', () => {
        const action = {
            type: SERVER_DATA_ACCOUNT_LIMITS,
            serverResponse: {
                get_limits: {
                    withdrawal: 100,
                },
            },
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({ withdrawal: 100 });

        const actualState = settingsReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should be able to update self_exclusions', () => {
        const action = {
            type: SERVER_DATA_ACCOUNT_SELF_EXCLUSION,
            serverResponse: {
                get_self_exclusion: {
                    turnover_limit: 100,
                },
            },
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({ turnover_limit: 100 });

        const actualState = settingsReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should be able to set the cashier account lock status', () => {
        const action = {
            type: SERVER_DATA_CASHIER_LOCK,
            serverResponse: {
                cashier_password: 1,
            },
        };
        const stateBefore = fromJS({ cashier_password: 0 });
        const expectedState = fromJS({ cashier_password: 1 });

        const actualState = settingsReducer(stateBefore, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should be able to update account settings', () => {
        const action = {
            type: SERVER_DATA_ACCOUNT_SETTINGS,
            serverResponse: {
                get_settings: {
                    name: 'My Name',
                },
            },
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({ name: 'My Name' });

        const actualState = settingsReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('shoulbd be able to update account setting field', () => {
        const action = {
            type: UPDATE_SETTINGS_FIELD,
            settings:
            {
                field: 'Name',
                value: 'My Name',
            },
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({ field: 'Name', value: 'My Name' });

        const actualState = settingsReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should be able to clear settings', () => {
        const action = {
            type: REMOVE_PERSONAL_DATA,
        };
        const beforeState = fromJS({ activeTab: 0 });
        const actualState = settingsReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });

    it('should return settings unchanged when no action type is provided', () => {
        const action = {
            type: '',
        };
        const beforeState = fromJS({ name: 'My Name' });

        const actualState = settingsReducer(beforeState, action);

        expect(actualState).to.equal(beforeState);
    });
});
