import { fromJS } from 'immutable';
import { expect } from 'chai';
import examineAssetSelectors from '../examineAssetSelectors';

describe('examineAssetSelectors', () => {
    const emptyState = () => ({
        assets: fromJS([]),
        dailyPrices: fromJS([]),
        workspace: fromJS({}),
        tradingTimes: fromJS({}),
        tradingOptions: fromJS([]),
        assetIndex: fromJS([[]]),
    });

    it('can be run with minimal inintial state', () => {
        const state = emptyState();
        expect(() => examineAssetSelectors(state)).to.not.throw();
    });
});
