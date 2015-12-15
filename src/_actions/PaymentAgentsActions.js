import { SERVER_DATA_PAYMENT_AGENTS, CHANGE_PAYMENT_AGENT_COUNTRY } from '../_constants/ActionTypes';

export const serverDataPaymentAgents = serverResponse => ({
    type: SERVER_DATA_PAYMENT_AGENTS,
    serverResponse,
});

export const changePaymentAgentCountry = country => ({
    type: CHANGE_PAYMENT_AGENT_COUNTRY,
    country,
});
