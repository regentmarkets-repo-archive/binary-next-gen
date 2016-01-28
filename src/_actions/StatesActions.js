import * as LiveData from '../_data/LiveData';
import { SERVER_DATA_STATES } from '../_constants/ActionTypes';

export const getStatesForCountry = country =>
    (dispatch, getState) => {
        const { states } = getState();
        if (states.get(country)) {
            return;
        }
        LiveData.api.getStatesForCountry(country).then(data => dispatch({
            type: SERVER_DATA_STATES,
            country,
            states: data.states_list,
        }));
    };
