import { UPDATE_DIGIT_STAT_FILTER } from '../_constants/ActionTypes';


export const updateDigitStatFilter = filter => ({
    type: UPDATE_DIGIT_STAT_FILTER,
    filter,
});
