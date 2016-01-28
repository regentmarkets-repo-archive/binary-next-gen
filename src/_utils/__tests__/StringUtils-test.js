import expect from 'expect';
import { stringIncrement } from '../StringUtils';

describe('stringIncrement', () => {
    it('increase string numberically adding trailing number', () => {
        const testString = 'halo1';

        const result = stringIncrement(testString);
        expect(result).toEqual('halo2');
    });

    it('increase number only string', () => {
        const testString = '999';

        const result = stringIncrement(testString);
        expect(result).toEqual('1000');
    });
});
