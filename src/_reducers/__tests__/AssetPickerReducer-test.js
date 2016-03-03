import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import * as actions from '../../_actions/AssetPickerActions';
import assetPickerReducer from '../AssetPickerReducer';

const getInitialState = (props) => ({
    query: '',
    submarket: '',
    ...props,
});

describe('assetPickerReducer', () => {
    describe('updateAssetPickerSearchQuery', () => {
        it('should return empty result when given empty asset list with empty query', () => {
            const stateBefore = fromJS();
            const actual = assetPickerReducer(stateBefore, actions.updateAssetPickerSearchQuery(''));
            const expected = fromJS(getInitialState());

            expect(expected).to.equal(actual);
        });

        it('when query is empty returns all assets', () => {
            const stateBefore = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            const actual = assetPickerReducer(stateBefore, actions.updateAssetPickerSearchQuery(''));
            const expected = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));

            expect(actual).to.deep.equal(expected);
        });

        it('query containing only spaces is treated as empty', () => {
            const stateBefore = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            const actual = assetPickerReducer(stateBefore, actions.updateAssetPickerSearchQuery('     '));
            const expected = fromJS(getInitialState({
                availableAssets: [{ display_name: 'asset1' }, { display_name: 'asset2' }, { display_name: 'asset3' }],
            }));
            expect(actual.availableAssets).to.equal(expected.availableAssets);
        });
    });
});
