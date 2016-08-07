import { expect } from 'chai';
import createDefaultBarriers from '../createDefaultBarriers';

describe('createDefaultBarriers', () => {
    it('spreads have no barriers', () => {
        const barriers = createDefaultBarriers({ category: 'spreads' });
        expect(barriers).to.deep.equal([undefined, undefined]);
    });

    it('should support tick barrier');

    it('should support intraday barrier');

    it('should support daily barrier');
});
