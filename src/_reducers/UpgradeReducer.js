import { fromJS } from 'immutable';

import {
  UPDATE_UPGRADE_INFO,
  UPDATE_SELECTED_CURRENCY,
} from '../_constants/ActionTypes';

const initialState = fromJS({
  upgrade: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_UPGRADE_INFO: {
      return state.merge(action.upgradeInfo);
    }
    case UPDATE_SELECTED_CURRENCY: {
      return state.merge(action.selectedCurrncy);
    }
    default: {
      return state;
    }
  }
};
