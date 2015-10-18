import { fromJS } from 'immutable';

import {
    WORKSPACE_ASSET_SELECT,
    SERVER_DATA_PROPOSAL,
    UPDATE_TICK_TRADE_PARAMETERS,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    assetSymbol: 'R_50',
    contractType: 'CALL',
    duration: 5,
    basis: 'payout',
    currency: 'USD',
    amount: 100,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case WORKSPACE_ASSET_SELECT: {
            return state.merge({ 'assetSymbol': action.symbol });
        }
        case UPDATE_TICK_TRADE_PARAMETERS: {
            return state.merge(action.parameters);
        }
        case SERVER_DATA_PROPOSAL: {
            window.console.log(action.serverResponse.proposal, state);
            return state.merge(action.serverResponse.proposal);
        }
        default:
            return state;
    }
};
