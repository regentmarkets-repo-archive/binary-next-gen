import { put } from 'redux-saga/effects';
import {
    reqDurationChange,
    reqDurationUnitChange,
    reqStartEpochChange,
    handleDurationChange,
    handleDurationUnitChange,
    handleStartEpochChange,
} from '../DurationSaga';
import { unsubscribeProposal } from '../ProposalSubscriptionSaga';

describe('DurationSaga', () => {
    describe('handleDurationChange', () => {
        const act = reqDurationChange(0, 9);
        const gen = handleDurationChange(act);
        it('should unsubscribe before anything else', () => {
            expect(gen.next().value).toEqual(put(unsubscribeProposal(0)));
        });
    });

    describe('handleDurationUnitChange', () => {
        it('should unsubscribe before anything else', () => {
            const act = reqDurationUnitChange(0, 't');
            const gen = handleDurationUnitChange(act);
            expect(gen.next().value).toEqual(put(unsubscribeProposal(0)));
        });
    });

    describe('handleStartEpochChange', () => {
        it('should unsubscribe before anything else', () => {
            const act = reqStartEpochChange(0, 1002997732);
            const gen = handleStartEpochChange(act);
            expect(gen.next().value).toEqual(put(unsubscribeProposal(0)));
        });
    });
});
