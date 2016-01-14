import expect from 'expect';
import { fromJS } from 'immutable';
import * as actions from '../../_actions/AssetSelectorActions';
import AssetSelectorReducer, { similarStr } from '../AssetSelectorReducer';

const getInitialState = (props) => ({
    query: '',
    markets: [],
    submarket: '',
    shownAssets: [],
    availableAssets: [],
    ...props
});

describe('AssetSelectorReducers', () => {
    describe('similarStr', () => {
        it('parameters can be undefined', () => {
            expect(() => similarStr(undefined, undefined)).toNotThrow();
            expect(() => similarStr(undefined, 'abc')).toNotThrow();
            expect(() => similarStr('abc', undefined)).toNotThrow();
        });

        it('undefined matches empty string', () => {
            expect(similarStr(undefined, undefined)).toEqual(true);
            expect(similarStr(undefined, '')).toEqual(true);
            expect(similarStr('', undefined)).toEqual(true);
        });

        it('if text is not contained return false', () => {
            const match = similarStr('abcdefghi', 'xyz');
            expect(match).toEqual(false);
        });

        it('if text is contained return true', () => {
            const match = similarStr('abcdefghi', 'cde');
            expect(match).toEqual(true);
        });

        it('if text is contained, regardless of case, return true', () => {
            const match = similarStr('abcdefghi', 'AbC');
            expect(match).toEqual(true);
        });
    });

    describe('updateAssetSelectorSearchQuery', () => {
        it('should return empty result when given empty asset list with empty query', () => {
            const stateBefore = fromJS();
            const actual = AssetSelectorReducer(stateBefore, actions.updateAssetSelectorSearchQuery([], ''));
            const expected = fromJS(getInitialState());
            expect(actual.toJS()).toEqual(expected.toJS());
        });

        it('when query is empty returns all assets', () => {
            const stateBefore = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            const actual = AssetSelectorReducer(stateBefore, actions.updateAssetSelectorSearchQuery([], ''));
            const expected = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            expect(actual.get('availableAssets')).toEqual(expected.get('availableAssets'));
        });

        it('query containing only spaces is treated as empty', () => {
            const stateBefore = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            const actual = AssetSelectorReducer(stateBefore, actions.updateAssetSelectorSearchQuery([], '     '));
            const expected = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            expect(actual.toJS().availableAssets).toEqual(expected.toJS().availableAssets);
        });

        it('full name search returns matching assets', () => {
            const stateBefore = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            const stateAfter = AssetSelectorReducer(stateBefore, actions.updateAssetSelectorSearchQuery([], 'asset1'));
            const expected = [{ display_name: 'asset1' }];
            expect(stateAfter.toJS().shownAssets).toEqual(expected);
        });
    });

    describe('updateAssetSelectorMarkets', () => {
    });

    describe('updateAssetSelectorSubmarket', () => {
    });
});
