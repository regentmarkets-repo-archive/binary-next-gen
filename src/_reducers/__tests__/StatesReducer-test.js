import { Map } from 'immutable';
import expect from 'expect';
import { SERVER_DATA_STATES } from '../../_constants/ActionTypes';
import State from '../StatesReducer';

describe('StatesReducer', ()=>{
    it('should be able to map each country with its respective states',()=>{
        const action = {
            type: SERVER_DATA_STATES,
            country: 'COUNTRY',
            states:['AY','WY'],
        };
        const beforeState = new Map({});
        const expectedState = new Map({COUNTRY: ["AY",'WY']});
        const actualState = State(beforeState,action);
        expect(actualState).toEqual(expectedState);
    });

    it('should return the default or initial state when action type is wrong or not given',()=>{
        const action = {
            type: 'WRONG_ACTION_TYPE',
        };
        const beforeState = new Map({});
        const actualState = State(beforeState,action);
        expect(actualState).toEqual(beforeState);
    })
});