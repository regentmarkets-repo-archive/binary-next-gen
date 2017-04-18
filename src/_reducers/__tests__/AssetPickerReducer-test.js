import { fromJS } from 'immutable';
import * as actions from '../../_actions/AssetPickerActions';
import assetPickerReducer from '../AssetPickerReducer';

const getInitialState = props => ({
    query: '',
    filter: 'all',
    ...props,
});

const dummyAssetList = () => [
    { display_name: 'asset1' },
    { display_name: 'asset2' },
    { display_name: 'asset3' },
];

describe('assetPickerReducer', () => {
    describe('updateAssetPickerSearchQuery', () => {
        it('should return empty result when given empty asset list with empty query', () => {
            const stateBefore = fromJS();
            const actual = assetPickerReducer(
                stateBefore,
                actions.updateAssetPickerSearchQuery(''),
            );
            const expected = fromJS(getInitialState());

            expect(expected).toEqual(actual);
        });

        it('when query is empty returns all assets', () => {
            const stateBefore = fromJS(
                getInitialState({
                    availableAssets: dummyAssetList(),
                }),
            );
            const actual = assetPickerReducer(
                stateBefore,
                actions.updateAssetPickerSearchQuery(''),
            );
            const expected = fromJS(
                getInitialState({
                    availableAssets: dummyAssetList(),
                }),
            );

            expect(actual).toEqual(expected);
        });

        it('query containing only spaces is treated as empty', () => {
            const stateBefore = fromJS(
                getInitialState({
                    availableAssets: dummyAssetList(),
                }),
            );
            const actual = assetPickerReducer(
                stateBefore,
                actions.updateAssetPickerSearchQuery('     '),
            );
            const expected = fromJS(
                getInitialState({
                    availableAssets: dummyAssetList(),
                }),
            );
            expect(actual.availableAssets).toEqual(expected.availableAssets);
        });
    });
});
