import { fromJS } from 'immutable';
import {
    updateActiveLayout,
    updateTradeParams,
    updateMultipleTradeParams,
} from '../../_actions';
import * as types from '../../_constants/ActionTypes';
import tradesParamsReducer from '../trades/TradesParamsReducer';

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
        amountDefault: 50
    };

    const initialState = fromJS([defaultParams]);

    it('should remove if existing trade is more than active layout when CHANGE_ACTIVE_LAYOUT received', () => {
        const action = updateActiveLayout(3, 1);
        const actual = tradesParamsReducer(initialState, action);
        expect(actual.toJS().length).toEqual(3);
    });

    it('should create new trade when received CHANGE_ACTIVE_LAYOUT based on assetChoices', () => {
        const action = updateActiveLayout(3, 1, ['R_25', 'R_50']);
        const actual = tradesParamsReducer(initialState, action);
        expect(actual.toJS().some(v => v.symbol === 'R_25')).toBeTruthy();
        expect(actual.toJS().some(v => v.symbol === 'R_50')).toBeTruthy();
    });

    it('should throw is assetChoices provided is less than number of new trade to be created', () => {
        const action = updateActiveLayout(3, 1, ['R_25']);
        expect(() => tradesParamsReducer(initialState, action)).toThrow();
    });

    it('should update specified trade params when UPDATE_TRADE_PARAMS received', () => {
        const action = updateTradeParams(0, 'hello', 'world');
        const actual = tradesParamsReducer(initialState, action);
        expect(actual.toJS()[0].hello).toEqual('world');
    });

    it('should update multiple trade params when UPDATE_MULTIPLE_TRADE_PARAMS received', () => {
        const action = updateMultipleTradeParams(0, { hello: 'world' });
        const actual = tradesParamsReducer(initialState, action);
        expect(actual.toJS()[0].hello).toEqual('world');
    });

    it('should remove specified params object when REMOVE_TRADE received', () => {
        const action = { type: types.REMOVE_TRADE, index: 1 };
        const actual = tradesParamsReducer(fromJS([defaultParams, defaultParams]), action);
        expect(actual.toJS().length).toEqual(1);
    });
});
