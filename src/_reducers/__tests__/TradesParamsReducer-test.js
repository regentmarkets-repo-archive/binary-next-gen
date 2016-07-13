import { fromJS } from 'immutable';
import { expect } from 'chai';

import {
    changeActiveLayout,
    updateTradeParams,
    updateMultipleTradeParams,
    removeTrade,
} from '../../_actions';
import * as types from '../../_constants/ActionTypes';
import TradesParamsReducer from '../trades/TradesParamsReducer';

describe('TradesParamsReducer', () => {
    const defaultParams = {
        symbol: 'R_100',
        tradeCategory: 'risefall',
        duration: 5,
        durationUnit: 't',
        basis: 'stake',
        amount: 50,
        type: 'CALL',
        barrierType: 'relative',
    };

    const initialState = fromJS([defaultParams]);

    it('should remove if existing trade is more than active layout when CHANGE_ACTIVE_LAYOUT received', () => {
        const action = changeActiveLayout(3, 1);
        const actual = TradesParamsReducer(initialState, action);
        expect(actual.toJS()).to.have.lengthOf(3);
    });

    it('should update specified trade params when UPDATE_TRADE_PARAMS received', () => {
        const action = updateTradeParams(0, 'hello', 'world');
        const actual = TradesParamsReducer(initialState, action);
        expect(actual.toJS()[0].hello).to.be.equal('world');
    });

    it('should update multiple trade params when UPDATE_MULTIPLE_TRADE_PARAMS received', () => {
        const action = updateMultipleTradeParams(0, {hello: 'world'});
        const actual = TradesParamsReducer(initialState, action);
        expect(actual.toJS()[0].hello).to.be.equal('world');
    });

    it('should remove specified params object when REMOVE_TRADE received', () => {
        const action = { type: types.REMOVE_TRADE, index: 1 };
        const actual = TradesParamsReducer(fromJS([defaultParams, defaultParams]), action);
        expect(actual.toJS()).to.have.lengthOf(1);
    });
});

