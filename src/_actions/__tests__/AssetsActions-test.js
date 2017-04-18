import * as types from '../../_constants/ActionTypes';
import {serverDataTradingTimes,serverDataAssetIndex,serverDataActiveSymbols} from '../AssetsActions';
import expect from 'expect';

describe('AssetsActions', ()=>{
  it('should return serverDataTradingTimes', ()=>{
    const response = {
      'msg_type': 'authorize',
      'authorize': {
        'currency': '',
        'email': 'negar+client02@binary.com',
        'balance': 0,
        'fullname': 'Mr abc dfk',
        'loginid': 'MF2203',
      },
    };
    const tradingTimes = {
      type: types.SERVER_DATA_TRADING_TIMES,
      serverResponse : response,
    };
    expect(serverDataTradingTimes(response)).toEqual(tradingTimes);
  });

  it('should return serverDataAssetIndex',()=>{
    const response = {
      'msg_type': 'authorize',
      'authorize': {
        'currency': '',
        'email': 'negar+client02@binary.com',
        'balance': 0,
        'fullname': 'Mr abc dfk',
        'loginid': 'MF2203',
      },
    };
    const dataAssetIndex = {
      type: types.SERVER_DATA_ASSET_INDEX,
      serverResponse : response,
    };
    expect(serverDataAssetIndex(response)).toEqual(dataAssetIndex);
  });

  it('should return serverDataActiveSymbols',()=>{
    const response = {
      'msg_type': 'authorize',
      'authorize': {
        'currency': '',
        'email': 'negar+client02@binary.com',
        'balance': 0,
        'fullname': 'Mr abc dfk',
        'loginid': 'MF2203',
      },
    };
    const DataActiveSysmbol = {
      type: types.SERVER_DATA_ACTIVE_SYMBOLS,
      serverResponse :response,
    };
    expect(serverDataActiveSymbols(response)).toEqual(DataActiveSysmbol);
  })
});
