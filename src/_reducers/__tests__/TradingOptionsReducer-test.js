import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
import tradingOptionsReducer from '../TradingOptionsReducer';
import { UPDATE_TRADING_OPTIONS } from '../../_constants/ActionTypes';

describe('tradingOptionsReducer', () => {
    it('should be able to update trading options', () => {
        const stateBefore = new Map({});

        const action = {
            type: UPDATE_TRADING_OPTIONS,
            symbol: 'FX',
            options: ['FX', 'TX'],
        };
        const stateAfter = tradingOptionsReducer(stateBefore, action);

        const expectedState = new Map({ FX: ['FX', 'TX'] });
        expect(expectedState.get('FX')).to.deep.equal(stateAfter.get('FX'));
    });
});
