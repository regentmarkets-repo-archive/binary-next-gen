import { expect } from 'chai';
import { put } from 'redux-saga/effects';
import { reqBarrierChange, handleBarrierChange } from '../saga/BarrierSaga';
import { unsubscribeProposal } from '../saga/ProposalSubscriptionSaga';

describe("BarrierSaga", () => {
    it('should try unsubscribe proposal as the first thing', () => {
        const act = reqBarrierChange(0, [0.11]);
        const gen = handleBarrierChange(act);

        expect(gen.next().value).to.deep.equal(put(unsubscribeProposal(0)));
    });
});
