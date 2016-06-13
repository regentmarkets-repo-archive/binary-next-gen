import { fromJS } from 'immutable';

const initialState = fromJS({ filter: 100 });

export default (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
};
