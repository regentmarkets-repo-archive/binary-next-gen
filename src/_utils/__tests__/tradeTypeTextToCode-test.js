import { expect } from 'chai';
import tradeTypeTextToCode from '../tradeTypeTextToCode';

describe('tradeTypeTextToCode', () => {
    it('returns the code behind friendly name', () => {
        const code = tradeTypeTextToCode('Rise');
        expect(code).to.equal('CALL');
    });
});
