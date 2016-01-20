import { fromJS } from 'immutable';
import expect from 'expect';
import { assetsSelector, marketTreeSelector } from '../AssetsSelectors';

describe('AssetsSelectors', () => {
    describe('assetsSelector', () => {
        it('should equal empty list when no assets', () => {
            const actual = assetsSelector({
                assets: []
            });
            expect(actual).toEqual([]);
        });

        it('should equal the full assets list', () => {
            const assetList = [
                { id: 1, name: 'Asset1' },
                { id: 2, name: 'Asset2' },
                { id: 3, name: 'Asset3' },
            ];
            const actual = assetsSelector({
                assets: assetList
            });
            expect(actual).toEqual(assetList);
        });
    });

    describe('marketTreeSelector', () => {
        it('should equal empty tree when no assets', () => {
            const actual = marketTreeSelector({
                assets: []
            })();
            expect(actual).toEqual({});
        });
    });
});
