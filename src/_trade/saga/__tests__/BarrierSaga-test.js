import { put } from 'redux-saga/effects';
import { reqBarrierChange, handleBarrierChange } from '../BarrierSaga';
import { unsubscribeProposal } from '../ProposalSubscriptionSaga';

describe('BarrierSaga', () => {
    const act = reqBarrierChange(0, [0.11]);
    const gen = handleBarrierChange(act);
    it('should try unsubscribe proposal as the first thing', () => {
        expect(gen.next().value).toEqual(put(unsubscribeProposal(0)));
    });

    it('should call subscribe action and update trade params');
});
