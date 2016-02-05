import expect from 'expect';
import TradingOptions from '../TradingOptionsReducer';
import { fromJS } from 'immutable';
import { UPDATE_TRADING_OPTIONS } from '../../_constants/ActionTypes';

describe('TradingOptionsReducer',()=>{
    it('should be able to update trading options',()=>{
        const action = {
            type: UPDATE_TRADING_OPTIONS,
            symbol: 'FX',
            opts: ['FX','TX'],
        };
        const beforeState = fromJS({});
        const actualState = TradingOptions(beforeState,action);
        const expectedState = fromJS({ FX: ['FX','TX'] });
        expect(actualState.toJS()).toEqual(expectedState.toJS());
    })
})
