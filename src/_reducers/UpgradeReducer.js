import { fromJS } from 'immutable';
import {
  UPDATE_LANDING_COMPANY,
} from '../_constants/ActionTypes';

const initialState = fromJS({
  landingCompany: Object,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LANDING_COMPANY: {
      return state.set('landingCompany', action.landingCompany.landing_company);
    }
    default:
      return state;
  }
};
