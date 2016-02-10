import { fromJS } from 'immutable';
import expect from 'expect';
import Settings from '../SettingsReducer'
import {
    CHANGE_SETTINGS_ACTIVE_TAB,
    SERVER_DATA_ACCOUNT_LIMITS,
    SERVER_DATA_ACCOUNT_SELF_EXCLUSION,
    SERVER_DATA_ACCOUNT_SETTINGS,
    UPDATE_SETTINGS_FIELD,
    REMOVE_PERSONAL_DATA,
} from '../../_constants/ActionTypes';

describe('SettingsReducer',()=>{
    it('should be able to set or select active tab by index',()=>{
        const action = {
            type: CHANGE_SETTINGS_ACTIVE_TAB,
            activeTabIndex: 2,
        };
        const stateBeefore = fromJS({activeTab: 0});
        const expectedState = fromJS({activeTab: 2});
        const actualState = Settings(stateBeefore,action);
        expect(actualState).toEqual(expectedState);
    });

    it('should be able to update account limits',()=>{
        const action = {
            type: SERVER_DATA_ACCOUNT_LIMITS,
            serverResponse: {
                get_limits: {
                    withdrawal: 100,
                },
            },
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({withdrawal: 100});
        const actualState = Settings(beforeState,action);
        expect(actualState).toEqual(expectedState);
    });

    it('should be able to update self_exclusions',()=>{
        const action = {
            type: SERVER_DATA_ACCOUNT_SELF_EXCLUSION,
            serverResponse: {
                get_self_exclusion: {
                    turnover_limit: 100,
                },
            },
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({turnover_limit: 100});
        const actualState = Settings(beforeState,action);
        expect(actualState).toEqual(expectedState);
    });

    it('should be able to update account settings',()=>{
        const action = {
            type: SERVER_DATA_ACCOUNT_SETTINGS,
            serverResponse: {
                get_settings: {
                    Name: 'My Name',
                },
            },
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({Name: 'My Name'});
        const actualState = Settings(beforeState,action);
        expect(actualState).toEqual(expectedState);
    });

    it('shoulbd be able to update account setting field',()=>{
        const action = {
            type: UPDATE_SETTINGS_FIELD,
            settings:
            {
                Field: 'Name',
                value: 'My Name',
            },
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({Field: 'Name', value: 'My Name'});
        const actualState = Settings(beforeState,action);
        expect(actualState.toJS()).toEqual(expectedState.toJS());
    });

    it('should be able to clear settings',()=>{
        const action = {
            type: REMOVE_PERSONAL_DATA,
        };
        const beforeState = fromJS({activeTab: 0,});
        const actualState = Settings(beforeState,action);
        expect(actualState).toEqual(beforeState);
    });

    it('should return settings unchanged when no action type is provided',()=>{
        const action = {
            type: ''
        };
        const beforeState = fromJS({ Name: 'My Name'});
        const actualState = Settings(beforeState,action);
        expect(actualState).toEqual(beforeState);
    });
});
