import { fromJS } from 'immutable';
import { UPDATE_TRADING_OPTIONS } from '../_constants/ActionTypes';

const initialState = fromJS({});

const splitRiseFallAndHighLow = options =>
    options.map(opt => {
        if (opt.contract_category === 'callput') {
            const cloned = Object.assign({}, opt);
            switch (opt.barriers) {
                case 0: {
                    const enrichedOpt = Object.assign(cloned, {
                        contract_category_display: 'Rise/Fall',
                        contract_category: 'risefall',
                    });
                    return enrichedOpt;
                }
                case 1: {
                    const enrichedOpt = Object.assign(cloned, {
                        contract_category_display: 'Higher/Lower',
                        contract_category: 'higherlower',
                    });
                    return enrichedOpt;
                }
                default: {
                    // console.error('Callput with barrier more than 1.');
                    return opt;
                }
            }
        } else return opt;
    });

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRADING_OPTIONS: {
            const optionsWithRiseFall = splitRiseFallAndHighLow(action.options);
            return state.set(action.symbol, optionsWithRiseFall);
        }
        default: {
            return state;
        }
    }
};
