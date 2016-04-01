import { expect } from 'chai';
import quickTradeReducer from '../QuickTradeReducer';
import { UPDATE_QUICK_TRADE_PARAMS, SET_QUICK_TRADE_FIELD } from '../../_constants/ActionTypes';
import { fromJS } from 'immutable';

describe('quickTradeReducer', () => {
    it('should update quick trade parameters', () => {
        const action = {
            type: UPDATE_QUICK_TRADE_PARAMS,
            symbol: 'FX',
            tradeType: 'FOREX',
            params: {
                PR: 'value',
                FT: 3,
            },
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({
            FX: {
                FOREX: {
                    params: {
                        PR: 'value',
                        FT: 3,
                    },
                },
            },
        });

        const actualState = quickTradeReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should be able to set quickTrade field and value', () => {
        const action = {
            type: SET_QUICK_TRADE_FIELD,
            symbol: 'FX',
            tradeType: 'FOREX',
            field: 'amount',
            value: 0,
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({
            FX: {
                FOREX: {
                    amount: 0,
                },
            },
        });

        const actualState = quickTradeReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });
});
