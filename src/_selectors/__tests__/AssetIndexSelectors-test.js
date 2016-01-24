import { fromJS } from 'immutable';
import expect from 'expect';
import { assetsSelector, marketTreeSelector } from '../AssetSelectors';
import assetIndexSelectors, { assetIndexSelector, indexTradeTypesSelector } from '../AssetIndexSelectors';

describe('AssetIndexSelectors', () => {

    describe('assetIndexSelector', () => {
        it('should be retrieved', () => {
            const actual = assetIndexSelector({
                assetIndex: [
                    [[], [], []]
                ],
            });
            expect(actual).toEqual([[[], [], []]]);
        });
    });

    describe('assetIndexSelectors', () => {
        it('should be initialized successfully', () => {
            const actual = assetIndexSelectors({
                assetIndex: [
                    [[], [], []]
                ],
                workspace: {
                    assetIndex: 0
                },
            });
            expect(actual).toExist();
        });
    });
});
