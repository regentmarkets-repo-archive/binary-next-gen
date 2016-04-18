import { expect } from 'chai';
import { fromJS } from 'immutable';
import portfolio from '../PortfolioReducer';
import {
    DETAILS_FOR_CONTRACT,
    UPDATE_NOW,
    REMOVE_PERSONAL_DATA,
} from '../../_constants/ActionTypes';

describe('portfolioReducer', () => {
    it('should be able to update contract details', () => {
        const beforeState = fromJS({});
        const action = {
            type: DETAILS_FOR_CONTRACT,
            areDetailsShown: true,
            contractShown: false,
        };
        const expectedState = fromJS({
            areDetailsShown: true,
            contractShown: false,
        });
        const actualState = portfolio(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });

    it('should be able to set contract or proposal time', () => {
        const beforeState = fromJS({});
        const expectedState = fromJS({
            now: new Date('2001-02-02'),
        });
        const action = {
            type: UPDATE_NOW,
            now: new Date('2001-02-02'),
        };
        const actualState = portfolio(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });

    it('should be able to remove personal portfolio data or clear proposals', () => {
        const action = {
            type: REMOVE_PERSONAL_DATA,
        };
        const beforeState = fromJS({});
        const actualState = portfolio(beforeState, action);
        expect(actualState.get('proposals')).to.equal(beforeState);
    });
});
