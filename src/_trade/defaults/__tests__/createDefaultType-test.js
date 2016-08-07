import { expect } from 'chai';
import createDefaultType from '../createDefaultType';
import { mockedContract } from '../../../_constants/MockContract';

describe('createDefaultType', () => {
    it('should take 1st type of category', () => {
        const defaultType = createDefaultType(mockedContract, 'risefall');
        expect(defaultType).to.be.equal('CALL');
    });
});
