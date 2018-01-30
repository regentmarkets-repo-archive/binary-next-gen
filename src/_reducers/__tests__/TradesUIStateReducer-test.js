import { fromJS } from 'immutable';
import {
    updateActiveLayout
} from '../../_actions';
import * as types from '../../_constants/ActionTypes';
import reducer from '../trades/TradesUIStateReducer';

describe('UIStateReducer', () => {
    const defaultUIState = {};
    const initialState = fromJS([defaultUIState]);

    it('should remove if existing bject is more than active layout when CHANGE_ACTIVE_LAYOUT received', () => {
        const action = updateActiveLayout(3, 1);
        const actual = reducer(initialState, action);
        expect(actual.toJS().length).toEqual(3);
    });

    it('should remove specified params object when REMOVE_TRADE received', () => {
        const action = { type: types.REMOVE_TRADE, index: 1 };
        const actual = reducer(fromJS([defaultUIState, defaultUIState]), action);
        expect(actual.toJS().length).toEqual(1);
    });
});
