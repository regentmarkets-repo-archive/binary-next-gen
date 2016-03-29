import { expect } from 'chai';
import stringIncrement from '../stringIncrement';

describe('stringIncrement', () => {
    it('increase string numberically adding trailing number', () => {
        const testString = 'halo1';

        const result = stringIncrement(testString);
        expect(result).to.equal('halo2');
    });

    it('increase number only string', () => {
        const testString = '999';

        const result = stringIncrement(testString);
        expect(result).to.equal('1000');
    });
});
