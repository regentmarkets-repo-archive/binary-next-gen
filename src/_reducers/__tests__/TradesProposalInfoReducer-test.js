import { fromJS } from 'immutable';
import { expect } from 'chai';

import {
    updateActiveLayout,
    updateTradeProposal,
    serverDataProposal,
} from '../../_actions';
import * as types from '../../_constants/ActionTypes';
import reducer from '../trades/TradesProposalInfoReducer';

describe('ProposalInfoReducer', () => {
    const defaultProposalInfo = {};
    const initialState = fromJS([defaultProposalInfo]);

    it('should remove if existing trade is more than active layout when CHANGE_ACTIVE_LAYOUT received', () => {
        const action = updateActiveLayout(3, 1);
        const actual = reducer(initialState, action);
        expect(actual.toJS()).to.have.lengthOf(3);
    });

    it('should update proposal info when UPDATE_TRADE_PROPOSAL received', () => {
        const action = updateTradeProposal(0, 'hello', 'world');
        const actual = reducer(initialState, action);
        expect(actual.toJS()[0].hello).to.be.equal('world');
    });

    it('should update proposal when SERVER_DATA_PROPOSAL received', () => {
        const mockServerResponseProposal1 = {
            proposal: {
                id: "E8B992A8-17F0-11E6-9E3A-8DAA6F5E9EF8",
                payout: 100
            },
        };

        const mockServerResponseProposal2 = {
            proposal: {
                id: "E8B992A8-17F0-11E6-9E3A-8DAA6F5E9EF8",
                payout: 1000
            },
        };
        const updateProposal = reducer(initialState, updateTradeProposal(0, 'proposal', mockServerResponseProposal1.proposal))

        const action = serverDataProposal(mockServerResponseProposal2);
        const actual = reducer(updateProposal, action);
        expect(actual.toJS()[0].proposal.payout).to.be.equal(1000);
    });

    it('should remove specified params object when REMOVE_TRADE received', () => {
        const action = { type: types.REMOVE_TRADE, index: 1 };
        const actual = reducer(fromJS([defaultProposalInfo, defaultProposalInfo]), action);
        expect(actual.toJS()).to.have.lengthOf(1);
    });
});


