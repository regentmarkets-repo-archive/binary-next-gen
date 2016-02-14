import { expect } from 'chai';
import { stringIncrement, numberToSignedString } from '../StringUtils';

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

describe('numberToSignedString', () => {
    it('Convert Number to a Signed string', () => {
        expect(numberToSignedString(4567)).to.equal('+4567');
    });
});
