import { api } from '../_data/LiveData';
import { SERVER_DATA_STATES } from '../_constants/ActionTypes';

export const getStatesForCountry = country => async (dispatch, getState) => {
    const { states } = getState();
    if (states.get(country)) {
        return;
    }
    const data = await api.getStatesForCountry(country);
    dispatch({
        type: SERVER_DATA_STATES,
        country,
        states: data.states_list,
    });
};
