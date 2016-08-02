import { expect } from 'chai';
import { put } from 'redux-saga/effects';
import {
    reqDurationChange,
    reqDurationUnitChange,
    reqStartDateChange,
    reqStartEpochChange,
    reqStartTimeChange,
    handleDurationChange,
    handleDurationUnitChange,
    handleStartDateChange,
    handleStartEpochChange,
    handleStartTimeChange,
} from '../saga/DurationSaga';
import { unsubscribeProposal } from '../saga/ProposalSubscriptionSaga';

describe("DurationSaga", () => {
    describe('handleDurationChange', () => {
        it('should unsubscribe before anything else', () => {
            const act = reqDurationChange(0, 9);
            const gen = handleDurationChange(act);
            expect(gen.next().value).to.deep.equal(put(unsubscribeProposal(0)));
        });
    });

    describe('handleDurationUnitChange', () => {
        it('should unsubscribe before anything else', () => {
            const act = reqDurationUnitChange(0, 't');
            const gen = handleDurationUnitChange(act);
            expect(gen.next().value).to.deep.equal(put(unsubscribeProposal(0)));
        });

    });

    describe('handleStartDateChange', () => {
        it('should unsubscribe before anything else', () => {
            const act = reqStartDateChange(0, '09/03/2001');
            const gen = handleStartDateChange(act);
            expect(gen.next().value).to.deep.equal(put(unsubscribeProposal(0)));
        });
    });

    describe('handleStartEpochChange', () => {
        it('should unsubscribe before anything else', () => {
            const act = reqStartEpochChange(0, 1002997732);
            const gen = handleStartEpochChange(act);
            expect(gen.next().value).to.deep.equal(put(unsubscribeProposal(0)));
        });
    });

    describe('handleStartTimeChange', () => {
        it('should unsubscribe before anything else', () => {
            const act = reqStartTimeChange(0, '09:10:33');
            const gen = handleStartTimeChange(act);
            expect(gen.next().value).to.deep.equal(put(unsubscribeProposal(0)));
        });
    });
});

