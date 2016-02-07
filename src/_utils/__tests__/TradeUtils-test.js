import expect from 'expect';
import { tradeTypeTextToCode, tradeTypeCodeToText, typeHasBarrier, pipsToDigits } from '../TradeUtils.js';

describe('tradeTypeTextToCode', () => {
    it('returns the code behind friendly name', () => {
        const code = tradeTypeTextToCode('Rise');
        expect(code).toEqual('CALL');
    });
});

describe('tradeTypeCodeToText', () => {
    it('returns friendly name from code', () => {
        const typeStr = tradeTypeCodeToText('CALL');
        expect(typeStr).toEqual('Rise');
    });
});

describe('typeHasBarrier', () => {
    it('detects when a type has no barriers', () => {
        const hasBarrier = typeHasBarrier('CALL');
        expect(hasBarrier).toEqual(false);
    });

    it('detects when a type has barriers', () => {
        const hasBarrier = typeHasBarrier('DIGITMATCH');
        expect(hasBarrier).toEqual(true);
    });
});


describe('pipsToDigits', () => {
    it('0.01 pips result in 2 digits after the decimal point', () => {
        const digits = pipsToDigits(0.01);
        expect(digits).toEqual(2);
    });

    it('0.0001 pips result in 4 digits after the decimal point', () => {
        const digits = pipsToDigits(0.0001);
        expect(digits).toEqual(4);
    });
});
