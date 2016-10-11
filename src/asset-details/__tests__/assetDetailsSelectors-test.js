import { fromJS } from 'immutable';
import assetDetailsSelectors from '../assetDetailsSelectors';

describe('assetDetailsSelectors', () => {
    const testState = () => ({
        assets: fromJS([
            { symbol: '1', display_name: 'Asset1', exchange_is_open: true },
        ]),
        assetIndex: fromJS([]),
        tradingTimes: fromJS([]),
        workspace: fromJS({
            examinedAsset: '1',
        }),
    });

    it('should work with empty state', () => {
        const state = {
            assets: fromJS([]),
            assetIndex: fromJS([]),
            tradingTimes: fromJS([]),
            workspace: fromJS({}),
        };
        const assetDetails = assetDetailsSelectors(state);

        expect(assetDetails).toBeDefined();
    });

    it('should return the same result for the same state', () => {
        const state = testState();

        const first = assetDetailsSelectors(state);
        const second = assetDetailsSelectors(state);

        expect(first.activeAsset).toEqual(second.activeAsset);
        expect(first.tradingTimes).toEqual(second.tradingTimes);
        expect(first.durations).toEqual(second.durations);

        expect(first).toEqual(second);
    });

    it('should be able to retrieve the active asset', () => {
        const state = testState();
        const assetDetails = assetDetailsSelectors(state);
        const expected = { name: 'Asset1', isOpen: true };

        expect(assetDetails.activeAsset.toJS()).toEqual(expected);
    });
});
