import expect from 'expect';
import { directionClassName } from '../StyleUtils.js';

describe('directionClassName', () => {
    it('returns no class name for 0', () => {
        const str = directionClassName(0);
        expect(str).toEqual('');
    });

    it('returns number-negative for < 0', () => {
        const str = directionClassName(-1);
        expect(str).toEqual('number-negative');
    });

    it('returns number-positive for > 0', () => {
        const str = directionClassName(1);
        expect(str).toEqual('number-positive');
    });
});
