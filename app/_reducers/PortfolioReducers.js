import { List, Map, fromJS } from 'immutable';

import {
    SERVER_DATA_PORTFOLIO,
    DETAILS_FOR_CONTRACT,
} from '../_constants/ActionTypes';

const initialState = new Map({
    detailsShown: false,
    contractShown: undefined,
    contracts: List.of(),
});

export default function serverData(state = initialState, action) {
    switch (action.type) {
        case SERVER_DATA_PORTFOLIO: {
            return state.set('contracts', fromJS(action.serverResponse.data.contracts));
        }
        case DETAILS_FOR_CONTRACT: {
            return state
                .set('areDetailsShown', action.areDetailsShown)
                .set('contractShown', action.contractShown);
        }
        default:
            return state;
    }
}
