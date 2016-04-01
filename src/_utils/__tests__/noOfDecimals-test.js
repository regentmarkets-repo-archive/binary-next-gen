import { expect } from 'chai';
import noOfDecimals from '../noOfDecimals';

describe('noOfDecimals', () => {
    it('should return no of decimals of a string', () => {
        const testStr = 0.0001;
        const decimals = noOfDecimals(testStr);
        expect(decimals).to.be.equal(4);
    });

    it('should return 0 when parameter is cannot be a number', () => {
        expect(noOfDecimals('halo')).to.be.equal(0);
    });
});
