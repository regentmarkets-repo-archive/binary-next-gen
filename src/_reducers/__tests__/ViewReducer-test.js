import { fromJS } from 'immutable';
import {
    UPDATE_TRADING_TIMES_FILTER,
    UPDATE_ASSET_INDEX_FILTER,
} from '../../_constants/ActionTypes';
import viewReducer from '../ViewsReducer';

describe('viewReducer', () => {
    const beforeState = fromJS({
        tradingTimes: {},
        assetIndex: {},
    });

    it('should update asset index filter when receive UPDATE_ASSET_INDEX_FILTER', () => {
        const action = {
            type: UPDATE_ASSET_INDEX_FILTER,
            filter: 'indices',
        };

        const actualState = viewReducer(beforeState, action);
        const expectedState = fromJS({
            tradingTimes: {},
            assetIndex: 'indices',
        });
        expect(expectedState).toEqual(actualState);
    });

    it('should update trading time filter when receive UPDATE_TRADING_TIMES_FILTER', () => {
        const action = {
            type: UPDATE_TRADING_TIMES_FILTER,
            filter: 'indices',
        };

        const actualState = viewReducer(beforeState, action);
        const expectedState = {
            assetIndex: {},
            tradingTimes: { filter: 'indices' },
        };
        expect(expectedState).toEqual(actualState.toJS());
    });
});
