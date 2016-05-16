import { fromJS } from 'immutable';
import { UPDATE_CHART_DATA_BY_CONTRACT, SERVER_DATA_PROPOSAL_OPEN_CONTRACT } from '../_constants/ActionTypes';
import { mergeTicks } from './TickReducer';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHART_DATA_BY_CONTRACT: {
            const { contractID, data } = action;
            const existing = state.get(contractID) ? state.get(contractID) : [];
            const merged = mergeTicks(existing, data);
            if (merged.length === existing.length) {
                return state;
            }
            return state.set(contractID, merged);
        }
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            const openContract = action.serverResponse.proposal_open_contract;
            if (Object.keys(openContract).length === 0) {
                return state;
            }
            const { contract_id } = openContract;
            if (state.has(contract_id)) {
                if (!openContract.sell_spot) {
                    const latestData = state.get(contract_id).slice(0);
                    latestData.push({ epoch: +(openContract.current_spot_time), quote: +(openContract.current_spot) });
                    return state.set(contract_id, latestData);
                }
            }
            return state;
        }
        default: return state;
    }
};
