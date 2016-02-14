import { expect } from 'chai';
import { tradeTypeTextToCode, tradeTypeCodeToText, typeHasBarrier, pipsToDigits } from '../TradeUtils.js';

describe('tradeTypeTextToCode', () => {
    it('returns the code behind friendly name', () => {
        const code = tradeTypeTextToCode('Rise');
        expect(code).to.equal('CALL');
    });
});

describe('tradeTypeCodeToText', () => {
    it('returns friendly name from code', () => {
        const typeStr = tradeTypeCodeToText('CALL');
        expect(typeStr).to.equal('Rise');
    });
});

describe('typeHasBarrier', () => {
    it('detects when a type has no barriers', () => {
        const hasBarrier = typeHasBarrier('CALL');
        expect(hasBarrier).to.be.false;
    });

    it('detects when a type has barriers', () => {
        const hasBarrier = typeHasBarrier('DIGITMATCH');
        expect(hasBarrier).to.be.true;
    });
});


describe('pipsToDigits', () => {
    it('0.01 pips result in 2 digits after the decimal point', () => {
        const digits = pipsToDigits(0.01);
        expect(digits).to.equal(2);
    });

    it('0.0001 pips result in 4 digits after the decimal point', () => {
        const digits = pipsToDigits(0.0001);
        expect(digits).to.equal(4);
    });
});
