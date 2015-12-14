import { fromJS } from 'immutable';
import { SERVER_DATA_PAYMENT_AGENTS, CHANGE_PAYMENT_AGENT_COUNTRY } from '../_constants/ActionTypes';

const initialState = fromJS({
    selectedCountry: 'id',
    paymentAgents: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PAYMENT_AGENTS: {
            return state.merge({ paymentAgents: action.serverResponse.paymentagent_list.list });
        }
        case CHANGE_PAYMENT_AGENT_COUNTRY: {
            return state.merge({ selectedCountry: action.country });
        }
        default: {
            return state;
        }
    }
};
