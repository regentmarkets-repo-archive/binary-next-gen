import { fromJS } from 'immutable';
import { expect } from 'chai';

import {
    createTrade,
    changeActiveLayout,
    updateTradeParams,
    updateMultipleTradeParams,
    removeTrade,
} from '../../../_actions';
import TradesParamsReducer from './TradesParamsReducer-test';

describe('TradesParamsReducer', () => {
    it('should create default set of params when CREATE_TRADE received', () => {
        const action = createTrade('test');
        const actual = TradesParamsReducer(undefined, action);
        expect(actual).to.have.lengthOf(2);
    });

    it('should remove if existing trade is more than active layout when CHANGE_ACTIVE_LAYOUT received', () => {

    });

    it('should update specified trade params when UPDATE_TRADE_PARAMS received', () => {

    });

    it('should update multiple trade params when UPDATE_MULTIPLE_TRADE_PARAMS received', () => {

    });

    it('should remove specified params object when REMOVE_TRADE received', () => {

    });
});

