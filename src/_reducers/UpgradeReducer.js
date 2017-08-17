import { fromJS } from 'immutable';

import {
  UPDATE_SHOULD_SHOW_UPGRADE,
} from '../_constants/ActionTypes';

const initialState = fromJS([]);

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SHOULD_SHOW_UPGRADE: {
      return state.merge(action.shouldShowUpgrade);
    }
    default:
      return state;
  }
};
