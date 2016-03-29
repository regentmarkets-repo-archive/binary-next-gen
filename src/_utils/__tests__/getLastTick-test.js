import { expect } from 'chai';
import getLastTick from '../getLastTick';

describe('getLastTick', () => {
    it('does not throw on empty input', () => {
        expect(getLastTick()).to.not.throw;
        expect(getLastTick()).to.equal(0);
    });

    it('does not throw on empty list as input', () => {
        expect(getLastTick([])).to.not.throw;
        expect(getLastTick([])).to.equal(0);
    });

    it('single item as input, is returned as output', () => {
        expect(getLastTick([{ quote: 5 }])).to.equal(5);
    });

    it('when passed multiple items, last one is returned', () => {
        expect(getLastTick([{ quote: 1 }, { quote: 2 }, { quote: 3 }])).to.equal(3);
    });
});
