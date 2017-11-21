import { fromJS } from 'immutable';

import {
  UPDATE_UPGRADE_INFO,
  UPDATE_UPGRADE_FIELD,
} from '../_constants/ActionTypes';

const initialState = fromJS({
  upgrade: {},
  selectedCurrency: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_UPGRADE_INFO: {
      return state.merge(action.upgradeInfo);
    }
    case UPDATE_UPGRADE_FIELD: {
      return state.setIn([action.field], action.value);
    }
    default: {
      return state;
    }
  }
};
