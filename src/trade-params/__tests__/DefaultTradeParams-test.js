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

    describe('createDefaultStartLater', () => {

    });

    describe('createDefaultDuration', () => {

    });

    describe('createDefaultBarrier', () => {
        it('should support tick barrier');
        it('should support intraday barrier');
        it('should support daily barrier');
    });

    describe('createDefaultBarrierType', () => {
        it('should support tick barrier');
        it('should support intraday barrier');
        it('should support daily barrier');
    });

    describe('createDefaultTradeParams', () => {
        it('should give correct params for closed market', () => {

        });
    });
});
