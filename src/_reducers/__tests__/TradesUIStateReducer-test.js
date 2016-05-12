import { fromJS } from 'immutable';
import { expect } from 'chai';

import {
    changeActiveLayout,
    updateTradeUIState,
    serverDataProposal,
} from '../../_actions';
import * as types from '../../_constants/ActionTypes';
import reducer from '../trades/TradesUIStateReducer';

describe('UIStateReducer', () => {
    const defaultUIState = {};
    const initialState = fromJS([defaultUIState]);

    it('should create default set of uiState when CREATE_TRADE received', () => {
        const action = { type: types.CREATE_TRADE, symbol: 'test' };
        const actual = reducer(initialState, action);
        expect(actual.toJS()).to.have.lengthOf(2);
    });

    it('should remove if existing bject is more than active layout when CHANGE_ACTIVE_LAYOUT received', () => {
        const action = changeActiveLayout(3, 1);
        const actual = reducer(initialState, action);
        expect(actual.toJS()).to.have.lengthOf(3);
    });

    it('should update ui sate when UPDATE_TRADE_UI_STATE received', () => {
        const action = updateTradeUIState(0, 'hello', 'world');
        const actual = reducer(initialState, action);
        expect(actual.toJS()[0].hello).to.be.equal('world');
    });

    it('should remove specified params object when REMOVE_TRADE received', () => {
        const action = { type: types.REMOVE_TRADE, index: 1 };
        const actual = reducer(fromJS([defaultUIState, defaultUIState]), action);
        expect(actual.toJS()).to.have.lengthOf(1);
    });
});



