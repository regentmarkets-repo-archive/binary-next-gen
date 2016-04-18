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

const withdrawToPaymentAgentHelper = (opts, success, failure, dispatch) => {
    dispatch(updatePaymentAgentField('inProgress', true));
    LiveData.api
        .withdrawToPaymentAgent(opts)
        .then(success, failure)
        .then(() => dispatch(updatePaymentAgentField('inProgress', false)));
};

export const withdrawToPaymentAgent = (agentId, currency, amount, verificationCode) =>
    dispatch => {
        const opts = { paymentagent_loginid: agentId, currency, amount, verification_code: verificationCode };
        const success = () => dispatch(updatePaymentAgentField('withdrawFailed', false));
        const failure = err => {
            dispatch(updatePaymentAgentField('withdrawFailed', true));
            dispatch(updatePaymentAgentField('withdrawError', err.message));
        };

        withdrawToPaymentAgentHelper(opts, success, failure, dispatch);
    };

export const withdrawToPaymentAgentDryRun = (agentId, currency, amount, verificationCode) =>
    dispatch => {
        const opts = {
            paymentagent_loginid: agentId,
            currency, amount, dry_run: 1,
            verification_code: verificationCode,
        };
        const success = () => dispatch(updatePaymentAgentField('dryRunFailed', false));
        const failure = err => {
            dispatch(updatePaymentAgentField('dryRunFailed', true));
            dispatch(updatePaymentAgentField('dryRunError', err.message));
        };

        withdrawToPaymentAgentHelper(opts, success, failure, dispatch);
    };
