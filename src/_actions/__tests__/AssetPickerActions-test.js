import * as types from '../../_constants/ActionTypes';
import expect from 'expect';
import {updateAssetPickerMarkets,updateAssetPickerSubmarket,updateAssetPickerSearchQuery} from '../AssetPickerActions';

describe('AssetPickerActions', ()=>{
  it('should updateAssetPickerSearchQuery',()=>{
    const expectedValue = {
      type: types.UPDATE_ASSET_PICKER_SEARCH_QUERY,
      query: 'updateAssetPickerSearchQuery query',
    };
    expect(updateAssetPickerSearchQuery('updateAssetPickerSearchQuery query')).toEqual(expectedValue);
  });

  it('should updateAssetPickerMarkets',()=>{
    const expectedValue = {
      type: types.UPDATE_ASSET_PICKER_MARKETS,
      markets: 'updateAssetPickerMarkets query',
    };
    expect(updateAssetPickerMarkets('updateAssetPickerMarkets query')).toEqual(expectedValue);
  });

  it('should updateAssetPickerSubmarket',()=>{
    const expectedValue = {
      type: types.UPDATE_ASSET_PICKER_SUBMARKET,
      submarket: 'updateAssetPickerSubmarket query',
    };
    expect(updateAssetPickerSubmarket('updateAssetPickerSubmarket query')).toEqual(expectedValue);
  })
});
