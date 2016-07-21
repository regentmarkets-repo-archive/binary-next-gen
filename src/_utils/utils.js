// TODO: should be removed once backend correct the open_contract_proposal to return consistent error object
export const openContractSubscriptionFailed = contract => contract.validation_error && Object.keys(contract).length < 3;
