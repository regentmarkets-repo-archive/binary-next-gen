import { fromJS } from 'immutable';
import { UPDATE_REALITY_CHECK, UPDATE_REALITY_CHECK_SUMMARY } from '../_constants/ActionTypes';

const initialState = fromJS({
    interval: 600,
    acknowledged: false,
    showInitial: false,
    showSummary: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REALITY_CHECK: {
            return state.merge(action.properties);
        }
        case UPDATE_REALITY_CHECK_SUMMARY: {
            const {
                start_time,
                loginid,
                currency,
                buy_count,
                buy_amount,
                sell_count,
                sell_amount,
                potential_profit,
                open_contract_count,
            } = action.summary;

            const sessionDuration = Math.floor(Date.now() / 1000) - start_time; // eslint-disable-line camelcase

            return state.set('summary', {
                loginTime: start_time,
                loginID: loginid,
                currency,
                contractBought: buy_count,
                sessionDuration,
                turnover: buy_amount,
                profitLoss: sell_amount - buy_amount, // eslint-disable-line camelcase
                contractSold: sell_count,
                potentialProfit: potential_profit,
                openContract: open_contract_count,
            });
        }
        default: return state;
    }
};
