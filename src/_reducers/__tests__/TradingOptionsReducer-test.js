import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS, Map } from 'immutable';
import tradingOptionsReducer from '../TradingOptionsReducer';
import { UPDATE_TRADING_OPTIONS } from '../../_constants/ActionTypes';

describe.skip('TradingOptionsReducer', () => {
    it('should be able to update trading options', () => {
        const stateBefore = new Map({});

        const action = {
            type: UPDATE_TRADING_OPTIONS,
            symbol: 'FX',
            opts: ['FX', 'TX'],
        };
        const stateAfter = tradingOptionsReducer(stateBefore, action);

        const expectedState = fromJS({ FX: ['FX', 'TX'] });
        expect(expectedState).to.equal(stateAfter);
    });
});
