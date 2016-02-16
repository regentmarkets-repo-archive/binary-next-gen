import { fromJS } from 'immutable';
import { expect } from 'chai';
import assetDetailsSelectors from '../assetDetailsSelectors';

describe('assetDetailsSelectors', () => {
    const testState = () => ({
        assets: fromJS([
            { symbol: '1', name: 'Asset1' },
        ]),
        tradingTimes: fromJS([]),
        workspace: fromJS({
            symbolSelected: '1',
        }),
    });

    it('should work with empty state', () => {
        const state = {
            assets: [],
            tradingTimes: [],
            workspace: {},
        };
        const assetDetails = assetDetailsSelectors(state);

        expect(assetDetails).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = testState();

        const first = assetDetailsSelectors(state);
        const second = assetDetailsSelectors(state);

        expect(first.assets).to.equal(second.assets);
        expect(first.tradingTimes).to.equal(second.tradingTimes);
        expect(first.tradingTimesFilter).to.equal(second.tradingTimesFilter);

        expect(first).to.equal(second);
    });

    it('should be able to retrieve the active asset', () => {
        const state = testState();
        const assetDetails = assetDetailsSelectors(state);

        expect(assetDetails.activeAsset).to.deep.equal(fromJS({ symbol: '1', name: 'Asset1' }));
    });
});
