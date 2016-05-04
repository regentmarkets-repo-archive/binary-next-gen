import * as defaultParams from '../DefaultTradeParams';
import { mockedContract } from '../../_constants/MockContract';
import { expect } from 'chai';

describe('DefaultTradeParams', () => {
    describe('createDefaultCategory', () => {
        it('should simply take the 1st available category', () => {
            const defaultCat = defaultParams.createDefaultCategory(mockedContract);
            expect(defaultCat).to.be.equal('asian');
        });
    });

    describe('createDefaultType', () => {
        it('should take 1st type of category', () => {
            const defaultType = defaultParams.createDefaultType(mockedContract, 'risefall');
            expect(defaultType).to.be.equal('CALL');
        });
    });

    // TODO: finish all the tests
});
