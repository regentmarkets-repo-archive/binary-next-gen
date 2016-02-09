import { fromJS } from 'immutable';
import expect from 'expect';
import Upgrade from '../UpgradeReducer';
import { UPGRADE_FIELD_UPDATE, UPGRADE_DOB_UPDATE, UPGRADE_FIELD_CLEAR } from '../../_constants/ActionTypes';

describe('UpgradeReducer',()=>{
    it('should be able to update upgrade field with the new value', ()=>{
        const action = {
            type: UPGRADE_FIELD_UPDATE,
            fieldName: 'username',
            fieldValue: 'myusername',
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({username: 'myusername'});
        const actualState = Upgrade(beforeState,action);
        expect(actualState).toEqual(expectedState);
    });

    it('should be able to update the day field of the account upgrade DOB ',()=>{
        const action = {
            type: UPGRADE_DOB_UPDATE,
            dayMonthOrYear: 'day',
            val : (new Date()).getDate(),
        };
        const beforeState = fromJS({dateOfBirth: new Date('2001-01-01')});
        const actualState = Upgrade(beforeState,action).get('dateOfBirth').getDate();
        const expectedState = (new Date()).getDate();
        expect(actualState).toEqual(expectedState);
    });

    it('should be able to update the month field of the account upgrade DOB ',()=>{
        const action = {
            type: UPGRADE_DOB_UPDATE,
            dayMonthOrYear: 'month',
            val : (new Date()).getMonth() + 1,
        };
        const beforeState = fromJS({dateOfBirth: new Date('2001-10-10')});
        const actualState = Upgrade(beforeState,action).get('dateOfBirth').getMonth();
        const expectedState = (new Date()).getMonth() + 1;
        expect(actualState).toEqual(expectedState);
    });


    it('should be able to update the year field of the account upgrade DOB ',()=>{
        const action = {
            type: UPGRADE_DOB_UPDATE,
            dayMonthOrYear: 'year',
            val : (new Date()).getFullYear(),
        };
        const beforeState = fromJS({dateOfBirth: new Date('2001-10-10')});
        const actualState = Upgrade(beforeState,action).get('dateOfBirth').getFullYear();
        const expectedState = (new Date()).getFullYear();
        expect(actualState).toEqual(expectedState);
    });

    it('it should be able to clear upgrade fields values and set it to default values',()=>{
        const initialState = fromJS({
            activeStep: 0,
            progress: false,
            salutation: 'Mr',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date(),
            residence: '',
            addressLine1: '',
            addressLine2: '',
            addressCity: '',
            addressState: '',
            addressPostcode: '',
            phone: '',
            secretQuestion: '',
            secretAnswer: '',
            success: false,
        });

        const action = {
            type: UPGRADE_FIELD_CLEAR,
        };
        const beforeState = fromJS({});
        const actualState = Upgrade(beforeState,action);
        expect(actualState.get('activeStep')).toEqual(initialState.get('activeStep'));
        expect(actualState.get('success')).toEqual(initialState.get('success'));
        expect(actualState.get('addressPostcode')).toEqual(initialState.get('addressPostcode'));
    });

    it('should return upgrade state unchanged when wrong or no action type is given ',()=>{
        const beforeState = fromJS({});
        const action = {
            type: 'WRONG_TYPE'
        };
        const actualState = Upgrade(beforeState,action);
        expect(actualState).toEqual(beforeState);
    });
});