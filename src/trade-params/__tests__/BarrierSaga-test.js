import chai, { expect } from 'chai';
import chaiSubset from 'chai-subset';
import { put } from 'redux-saga/effects';
import { updateMultipleTradeParams } from '../../_actions/';
import { reqBarrierChange, handleBarrierChange } from '../saga/BarrierSaga';
import { unsubscribeProposal, subscribeProposal } from '../saga/ProposalSubscriptionSaga';

chai.use(chaiSubset);

describe("BarrierSaga", () => {
    const act = reqBarrierChange(0, [0.11]);
    const gen = handleBarrierChange(act);
    it('should try unsubscribe proposal as the first thing', () => {
        expect(gen.next().value).to.deep.equal(put(unsubscribeProposal(0)));
    });

    it('should call subscribe action and update trade params');
});
