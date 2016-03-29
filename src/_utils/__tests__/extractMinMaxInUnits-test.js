import { expect } from 'chai';
import extractMinMaxInUnits from '../extractMinMaxInUnits';

describe('extractMinMaxInUnits', () => {
    it('should return array of objects with [unit, min, max] as key', () => {
        const minS = 50;
        const maxS = 500;
        const durations = extractMinMaxInUnits(minS, maxS);
        expect(durations).to.have.length(2);

        expect(durations[0].unit).to.equal('s');
        expect(durations[0].min).to.equal(50);
        expect(durations[0].max).to.equal(500);
    });

    it('should not return objects with max <= 1', () => {
        const minS = 5;
        const maxS = 5000;
        const durations = extractMinMaxInUnits(minS, maxS);
        expect(durations.some(d => d.unit === 'd')).to.be.false;
    });
});
