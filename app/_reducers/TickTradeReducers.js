import { Map } from 'immutable';

import {
    UPDATE_TICK_TRADE_SUBMARKET,
    UPDATE_TICK_TRADE_DATE,
} from '../_constants/ActionTypes';

const initialState = new Map({
    assetSymbol: null,
    tradeType: null,
    duration: 5,
    return: {
        basis: 'payout',
        currency: 'USD',
        amount: 0,
    },
    priceProposal: { },
});

// api.getPriceProposal({
//     symbol: symbol,
//     duration,
//     currency,
//     amount,
//     date_start: new Date(),
//     basis,
//     duration_unit: 't',
//     contract_type,
// });

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TICK_TRADE_SUBMARKET:
            return state.merge(action.parameters);
        case UPDATE_TICK_TRADE_DATE:
            return state.merge(action.parameters);
        // case PLACE_ORDER:
        //     return state.merge
        default:
            return state;
    }
};
