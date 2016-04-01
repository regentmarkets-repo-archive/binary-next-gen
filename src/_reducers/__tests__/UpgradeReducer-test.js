import { fromJS } from 'immutable';
import { expect } from 'chai';
import upgradeReducer from '../UpgradeReducer';
import { UPGRADE_FIELD_UPDATE, UPGRADE_DOB_UPDATE, UPGRADE_FIELD_CLEAR } from '../../_constants/ActionTypes';

describe('upgradeReducer', () => {
    it('should be able to update upgrade field with the new value', () => {
        const action = {
            type: UPGRADE_FIELD_UPDATE,
            fieldName: 'username',
            fieldValue: 'myusername',
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({ username: 'myusername' });

        const actualState = upgradeReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should be able to update the day field of the account upgrade DOB ', () => {
        const action = {
            type: UPGRADE_DOB_UPDATE,
            dayMonthOrYear: 'day',
            val: (new Date()).getDate(),
        };
        const beforeState = fromJS({ dateOfBirth: new Date('2001-01-01') });
        const actualState = upgradeReducer(beforeState, action).get('dateOfBirth').getDate();

        const expectedState = (new Date()).getDate();

        expect(expectedState).to.equal(actualState);
    });

    it('should be able to update the month field of the account upgrade DOB', () => {
        const action = {
            type: UPGRADE_DOB_UPDATE,
            dayMonthOrYear: 'month',
            val: (new Date()).getMonth() + 1,
        };
        const expectedState = (new Date()).getMonth() + 1;
        const beforeState = fromJS({ dateOfBirth: new Date('2001-10-10') });
        const actualState = upgradeReducer(beforeState, action).get('dateOfBirth').getMonth();

        expect(expectedState).to.equal(actualState);
    });


    it('should be able to update the year field of the account upgrade DOB ', () => {
        const action = {
            type: UPGRADE_DOB_UPDATE,
            dayMonthOrYear: 'year',
            val: (new Date()).getFullYear(),
        };
        const beforeState = fromJS({ dateOfBirth: new Date('2001-10-10') });
        const actualState = upgradeReducer(beforeState, action).get('dateOfBirth').getFullYear();
        const expectedState = (new Date()).getFullYear();
        expect(expectedState).to.equal(actualState);
    });

    it('it should be able to clear upgrade fields values and set it to default values', () => {
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
        const actualState = upgradeReducer(beforeState, action);

        expect(actualState.get('activeStep')).to.equal(initialState.get('activeStep'));
        expect(actualState.get('success')).to.equal(initialState.get('success'));
        expect(actualState.get('addressPostcode')).to.equal(initialState.get('addressPostcode'));
    });

    it('should return upgrade state unchanged when wrong or no action type is given ', () => {
        const beforeState = fromJS({});
        const action = {
            type: 'WRONG_TYPE',
        };

        const actualState = upgradeReducer(beforeState, action);

        expect(actualState).to.equal(beforeState);
    });
});
