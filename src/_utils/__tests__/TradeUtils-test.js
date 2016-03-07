import { expect } from 'chai';
import {
    getLastTick,
    pipsToDigits,
    tradeTypeTextToCode,
    tradeTypeCodeToText,
    typeHasBarrier,
} from '../TradeUtils';

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
