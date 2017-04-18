import { SERVER_COUNTRY_LIST } from '../_constants/ActionTypes';

export const serverCountryList = countries => ({
    type: SERVER_COUNTRY_LIST,
    countries,
});
