import {
    SERVER_DATA_PAYMENT_AGENTS,
    UPDATE_PAYMENT_AGENT_FIELD,
} from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';

export const updatePaymentAgentField = (fieldName, fieldValue) => ({
    type: UPDATE_PAYMENT_AGENT_FIELD,
    fieldName,
    fieldValue,
});

export const serverDataPaymentAgents = serverResponse => ({
    type: SERVER_DATA_PAYMENT_AGENTS,
    serverResponse,
});

export const withdrawToPaymentAgent = (agentId, currency, amount) => {
    return dispatch => {
        dispatch(updatePaymentAgentField('inWithdraw', true));
        LiveData.api.withdrawToPaymentAgent({
            paymentagent_loginid: agentId,
            currency,
            amount,
        }).then(
            () => dispatch(updatePaymentAgentField('withdrawFailed', false)),
                err => {
                dispatch(updatePaymentAgentField('withdrawFailed', true));
                dispatch(updatePaymentAgentField('withdrawError', err.message));
            }
        ).then(() => dispatch(updatePaymentAgentField('inWithdraw', false)));
    };
};

export const withdrawToPaymentAgentDryRun = (agentId, currency, amount) => {
    return dispatch => {
        dispatch(updatePaymentAgentField('inDryRun', true));
        LiveData.api.withdrawToPaymentAgent({
            paymentagent_loginid: agentId,
            currency,
            amount,
            dry_run: 1,
        }).then(
            () => dispatch(updatePaymentAgentField('dryRunFailed', false)),
            err => {
                dispatch(updatePaymentAgentField('dryRunFailed', true));
                dispatch(updatePaymentAgentField('dryRunError', err.message));
            }
        ).then(() => dispatch(updatePaymentAgentField('inDryRun', false)));
    };
};
