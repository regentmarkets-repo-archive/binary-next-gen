import * as LiveData from '../_data/LiveData';

const getSoldContractTicks = (symbol, contract) =>
    LiveData.api.getTickHistory(symbol, { start: contract.purchase_time, end: contract.sell_time, adjust_start_time: 1 });

const getActiveContractTicks = (symbol, contract) =>
    LiveData.api.getTickHistory(symbol, { start: contract.purchase_time, adjust_start_time: 1 });

export const getInfoByContractId = contractId => {
    LiveData.api.subscribeToOpenContract(contractId)
        .then(
            response => {
                console.log('r', response);
                const contract = response.proposal_open_contract;
                const isSold = contract.is_expired && !contract.is_valid_to_sell;

            },
            error => {
                
            }
        );
};
