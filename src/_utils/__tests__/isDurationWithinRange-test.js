import { expect } from 'chai';
import isDurationWithinRange from '../isDurationWithinRange';

describe('isDurationWithinRange', () => {
    it('should return true if duration is within range', () => {
        const duration = '20';
        const unit = 's';
        const range = [{ unit: 's', min: 10, max: 365 }];

        expect(isDurationWithinRange(duration, unit, range)).to.be.true;
    });

    it('should return false if duration is not within range', () => {
        const duration = '2000';
        const unit = 's';
        const range = [{ unit: 's', min: 10, max: 365 }];

        expect(isDurationWithinRange(duration, unit, range)).to.be.false;
    });
});
