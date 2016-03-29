import { expect } from 'chai';
import extractDurationHelper from '../extractDurationHelper';
import contractsForR50 from '../../_test-data/contractsForR50';

describe('extractDurationHelper', () => {
    it('should return empty array for spreads as spreads does not have duration', () => {
        const durationsForSpread = extractDurationHelper(contractsForR50, 'SPREAD');
        expect(durationsForSpread).be.empty;
    });

    it('should return arrays of duration for non-spread type', () => {
        const durations = extractDurationHelper(contractsForR50, 'CALL');
        expect(durations).to.have.length(5);
    });
});
