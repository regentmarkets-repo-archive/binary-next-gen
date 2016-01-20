import expect from 'expect';
import { fromJS } from 'immutable';
import * as actions from '../../_actions/AssetPickerActions';
import AssetsReducer from '../AssetsReducer';

describe('AssetsReducers', () => {
    describe('serverDataActiveSymbols', () => {
        it('by default is empty', () => {
            const stateBefore = fromJS();
            const actual = AssetsReducer(stateBefore, actions.updateAssetPickerSearchQuery([], ''));
            const expected = fromJS(getInitialState());
            expect(actual.toJS()).toEqual(expected.toJS());
        });

        it('when query is empty returns all assets', () => {
            const stateBefore = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            const actual = AssetPickerReducer(stateBefore, actions.updateAssetPickerSearchQuery([], ''));
            const expected = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            expect(actual.get('availableAssets')).toEqual(expected.get('availableAssets'));
        });

        it('query containing only spaces is treated as empty', () => {
            const stateBefore = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            const actual = AssetPickerReducer(stateBefore, actions.updateAssetPickerSearchQuery([], '     '));
            const expected = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            expect(actual.toJS().availableAssets).toEqual(expected.toJS().availableAssets);
        });

        it('full name search returns matching assets', () => {
            const stateBefore = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            const stateAfter = AssetPickerReducer(stateBefore, actions.updateAssetPickerSearchQuery([], 'asset1'));
            const expected = [{ display_name: 'asset1' }];
            expect(stateAfter.toJS().shownAssets).toEqual(expected);
        });
    });

    describe('updateAssetPickerMarkets', () => {
    });

    describe('updateAssetPickerSubmarket', () => {
    });
});
