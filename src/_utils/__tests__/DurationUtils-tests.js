import * as DurationUtils from '../DurationUtils';
import { expect } from 'chai';
import { contractsForR_50 } from '../../_test-data/tradingOptions';

/**
 *  Duration refer to string with digit follow by duration unit
 *  eg. '5h', '2t' ...
 */

describe('isDurationWithinRange', () => {
    it('should return true if duration is within range', () => {
        const duration = '20';
        const unit = 's';
        const range = [{ unit: 's', min: 10, max: 365}];

        expect(DurationUtils.isDurationWithinRange(duration, unit, range)).to.be.true;
    });

    it('should return false if duration is not within range', () => {
        const duration = '2000';
        const unit = 's';
        const range = [{ unit: 's', min: 10, max: 365}];

        expect(DurationUtils.isDurationWithinRange(duration, unit, range)).to.be.false;
    });
});

describe('extractMinMaxInUnits', () => {
    it('should return array of objects with [unit, min, max] as key', () => {
        const minS = 50;
        const maxS = 500;
        const durations = DurationUtils.extractMinMaxInUnits(minS, maxS);
        expect(durations).to.have.length(2);

        expect(durations[0].unit).to.equal('s');
        expect(durations[0].min).to.equal(50);
        expect(durations[0].max).to.equal(500);
    });

    it('should not return objects with max <= 1', () => {
        const minS = 5;
        const maxS = 5000;
        const durations = DurationUtils.extractMinMaxInUnits(minS, maxS);
        expect(durations.some(d => d.unit === 'd')).to.be.false;
    });

});

describe('extractDurationHelper', () => {

    it('should return empty array for spreads as spreads does not have duration', () => {
        const durationsForSpread = DurationUtils.extractDurationHelper(contractsForR_50, 'SPREAD');
        expect(durationsForSpread).be.empty;
    });

    it('should return arrays of duration for non-spread type', () => {
        const durations = DurationUtils.extractDurationHelper(contractsForR_50, 'CALL');
        expect(durations).to.have.length(5);
    })
});