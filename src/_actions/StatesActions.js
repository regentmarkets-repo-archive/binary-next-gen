import * as LiveData from '../_data/LiveData';
import { SERVER_DATA_STATES } from '../_constants/ActionTypes';

export const getStatesForCountry = async country =>
    async (dispatch, getState) => {
        const { states } = getState();
        if (states.get(country)) {
            return;
        }
        const data = await LiveData.api.getStatesForCountry(country);
        dispatch({
            type: SERVER_DATA_STATES,
            country,
            states: data.states_list,
        });
    };
