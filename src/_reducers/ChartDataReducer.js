import { fromJS } from 'immutable';
import { UPDATE_CHART_DATA_BY_CONTRACT, SERVER_DATA_PROPOSAL_OPEN_CONTRACT } from '../_constants/ActionTypes';
import { mergeTicks } from './TickReducer';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHART_DATA_BY_CONTRACT: {
            const { contractID, data, dataType } = action;
            const existing = state.hasIn([contractID, dataType]) ? state.getIn([contractID, dataType]) : [];
            const merged = mergeTicks(existing, data);

            if (merged.length === existing.length) {
                return state;
            }
            return state.setIn([contractID, dataType], merged);
        }
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            const openContract = action.serverResponse.proposal_open_contract;
            if (Object.keys(openContract).length === 0) {
                return state;
            }

            if (state.has(openContract.contract_id)) {
                if (!openContract.sell_time && openContract.current_spot && openContract.current_spot_time) {
                    const latestData = state.getIn([openContract.contract_id, 'ticks']).slice(0);
                    latestData.push({ epoch: +(openContract.current_spot_time), quote: +(openContract.current_spot) });
                    return state.setIn([openContract.contract_id, 'ticks'], latestData);
                }
            }
            return state;
        }
        default: return state;
    }
};
