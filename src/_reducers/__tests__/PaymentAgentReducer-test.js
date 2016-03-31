import { expect } from 'chai';
import { fromJS } from 'immutable';
import paymentAgentReducer from '../PaymentAgentReducer';
import {
    SERVER_DATA_PAYMENT_AGENTS,
    UPDATE_PAYMENT_AGENT_FIELD,
} from '../../_constants/ActionTypes';

describe('paymentAgentReducer', () => {
    it('should update data payment agent list', () => {
        const beforeState = fromJS({});
        const action = {
            type: SERVER_DATA_PAYMENT_AGENTS,
            serverResponse: {
                paymentagent_list: {
                    list: ['First Agent', 'Second Agent'],
                },
            },
        };
        const expectedState = fromJS({
            paymentAgents: ['First Agent', 'Second Agent'],
        });

        const actualState = paymentAgentReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should should update payment agent field with the given value', () => {
        const beforeState = fromJS({});
        const action = {
            type: UPDATE_PAYMENT_AGENT_FIELD,
            fieldName: 'username',
            fieldValue: 'xxx',
        };
        const expectedState = fromJS({ username: 'xxx' });
        const actualState = paymentAgentReducer(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });
});
