import { fromJS } from 'immutable';

const initialState = fromJS({
    1: {
        symbol: 'R_100',
        tradeCategory: 'callput',
        duration: 5,
        durationUnit: 'd',
        basis: 'payout',
        amount: 100,
    },
});

export default (state = initialState, actions) => {
    switch (actions.type) {
        default: return state;
    }
};
