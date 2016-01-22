import { fromJS } from 'immutable';
import {
    SERVER_DATA_PAYMENT_AGENTS,
    UPDATE_PAYMENT_AGENT_FIELD,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    selectedCountry: 'id',
    paymentAgents: [],
    selectedPaymentAgent: '',
    withdrawFailed: false,
    withdrawError: '',
    dryRunFailed: false,
    dryRunError: '',
    inProgress: false,
    withdrawAmount: 0,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PAYMENT_AGENTS: {
            return state.merge({ paymentAgents: action.serverResponse.paymentagent_list.list });
        }
        case UPDATE_PAYMENT_AGENT_FIELD: {
            return state.set(action.fieldName, action.fieldValue);
        }
        default: {
            return state;
        }
    }
};
