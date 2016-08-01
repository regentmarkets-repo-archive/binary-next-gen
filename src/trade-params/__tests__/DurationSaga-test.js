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

    });

    describe('handleDurationUnitChange', () => {

    });

    describe('handleStartDateChange', () => {

    });

    describe('handleStartEpochChange', () => {

    });

    describe('handleStartTimeChange', () => {

    });

    it('should try unsubscribe proposal as the first thing', () => {
        const act = reqBarrierChange(0, [0.11]);
        const gen = handleBarrierChange(act);

        expect(gen.next().value).to.deep.equal(put(unsubscribeProposal(0)));
    });
});

