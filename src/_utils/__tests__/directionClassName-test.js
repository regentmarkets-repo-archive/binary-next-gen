import { expect } from 'chai';
import directionClassName from '../directionClassName';

describe('directionClassName', () => {
    it('returns no class name for 0', () => {
        const str = directionClassName(0);
        expect(str).to.equal('');
    });

    it('returns number-negative for < 0', () => {
        const str = directionClassName(-1);
        expect(str).to.equal('number-negative');
    });

    it('returns number-positive for > 0', () => {
        const str = directionClassName(1);
        expect(str).to.equal('number-positive');
    });
});
