import {
    SERVER_DATA_FOR_PORTFOLIO,
    DETAILS_FOR_CONTRACT,
} from '../_constants/ActionTypes';

const initialState = {
    detailsShown: false,
    contractShown: undefined,
    contracts: [],
};

export default function serverData(state = initialState, action) {
    switch (action.type) {
        case SERVER_DATA_FOR_PORTFOLIO: {
            return {
                ...state,
                contracts: action.serverResponse.data.contracts,
            };
        }
        case DETAILS_FOR_CONTRACT: {
            return {
                ...state,
                areDetailsShown: action.areDetailsShown,
                contractShown: action.contractShown,
            };
        }
        default:
            return state;
    }
}
