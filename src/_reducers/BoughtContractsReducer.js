import { fromJS } from 'immutable';
import {
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_PORTFOLIO,
    SERVER_DATA_TRANSACTION,
    REMOVE_PERSONAL_DATA,
    UPDATE_OPEN_CONTRACT_FIELD,
} from '../_constants/ActionTypes';

const initialState = fromJS({});

const convertOpenContract = openContract => {
    const cloned = Object.assign({}, openContract);
    if (cloned.sell_spot && cloned.sell_spot_time) {
        cloned.exit_tick = cloned.sell_spot;
        cloned.exit_tick_time = cloned.sell_spot_time;
    } else if (cloned.sell_time) {
        cloned.exit_tick_time = cloned.sell_time;
    }
    return cloned;
};

const computeAsianBarrier = (contract, ticks) => {
    const ticksWithinContractPeriod = ticks
        .filter(t =>
            t.epoch >= contract.entry_tick_time &&
            (!contract.exit_tick_time || t.epoch <= contract.exit_tick_time)
        );

    const sum = ticksWithinContractPeriod.reduce((a, b) => a + b.quote, 0);
    return sum / ticksWithinContractPeriod.length;
};

const asianTicksCache = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            if (Object.keys(action.serverResponse.proposal_open_contract).length === 0) {
                return state;
            }

            const openContract = convertOpenContract(action.serverResponse.proposal_open_contract);
            if (openContract.contract_type.includes('ASIAN') && !openContract.barrier && openContract.entry_tick_time) {
                const existingTicks = asianTicksCache[openContract.contract_id] || [];
                existingTicks.push({ epoch: +(openContract.current_spot_time), quote: +(openContract.current_spot) });
                asianTicksCache[openContract.contract_id] = existingTicks;
                const avgBarrier = computeAsianBarrier(openContract, existingTicks);
                openContract.barrier = avgBarrier;
            }

            // remove this 2 keys as we do not need it
            delete openContract.current_spot;
            delete openContract.current_spot_time;

            return state.setIn([openContract.contract_id], fromJS(openContract));
        }
        case SERVER_DATA_PORTFOLIO: {
            const contracts = action.serverResponse.portfolio.contracts;
            return contracts
                .reduce((prev, curr) => prev.mergeIn([curr.contract_id], curr), state);
        }
        case SERVER_DATA_TRANSACTION: {
            const tx = action.serverResponse.transaction;
            if (tx.action === 'sell') {
                return state
                    .mergeIn([tx.contract_id], {
                        sell_price: tx.amount,
                        sell_time: tx.transaction_time,
                    })
                    .mergeIn([tx.contract_id, 'transaction_ids'], {
                        sell: tx.transaction_id,
                    });
            }
            return state;
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        case UPDATE_OPEN_CONTRACT_FIELD: {
            const field = action.openContractField;
            return state.mergeIn([field.id], field);
        }
        default:
            return state;
    }
};
