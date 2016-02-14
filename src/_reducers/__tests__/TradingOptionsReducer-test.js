import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS, Map } from 'immutable';
import tradingOptionsReducer from '../TradingOptionsReducer';
import { UPDATE_TRADING_OPTIONS } from '../../_constants/ActionTypes';

describe('TradingOptionsReducer', () => {
    it('should be able to update trading options', () => {
        const action = {
            type: UPDATE_TRADING_OPTIONS,
            symbol: 'FX',
            opts: ['FX', 'TX'],
        };
        const beforeState = new Map({});
        const actualState = tradingOptionsReducer(beforeState, action);
        const expectedState = fromJS({ FX: ['FX', 'TX'] });
        expect(expectedState).to.equal(actualState);
    });
});
