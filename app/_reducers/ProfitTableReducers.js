import { Map } from 'immutable';

import {
    SERVER_DATA_PROFIT_TABLE,
} from '../_constants/ActionTypes';

const initialState = new Map({
    detailsShown: false,
    contractShown: undefined,
    contracts: [{
        purchaseDate: new Date(),
        ref: '0910347813908',
        contract: 'USD 10.00 payout if the last tick of Random 100 Index is strictly higher than the average of the 5 ticks.',
        purchasePrice: 5.15,
        saleDate: new Date(),
        salePrice: 10.00,
        profitLoss: 4.85,
    }, {
        purchaseDate: new Date(),
        ref: '039985591508',
        contract: 'USD 10.00 payout if Australian Index is strictly higher than entry spot at 1 hour after contract start time.',
        purchasePrice: 5.30,
        saleDate: new Date(),
        salePrice: 0.00,
        profitLoss: -5.30,
    }],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PROFIT_TABLE: {
            return state; // no call yet implemented
        }
        default:
            return state;
    }
};
