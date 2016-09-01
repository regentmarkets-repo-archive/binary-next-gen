import { fromJS } from 'immutable';
import { UPDATE_TRADING_OPTIONS, TRADING_OPTIONS_ERROR } from '../_constants/ActionTypes';

const initialState = fromJS({});

const splitRiseFallAndHighLow = options =>
    options
        .filter(opt => opt.contract_category !== 'spreads')           // TODO: temp disable spreads until backend is up
        .map(opt => {
        if (opt.contract_category === 'callput') {
            const cloned = Object.assign({}, opt);
            switch (opt.barriers) {
                case 0: {
                    const addedRiseFall = Object.assign(cloned, {
                        contract_category_display: 'Rise/Fall',
                        contract_category: 'risefall',
                    });
                    return addedRiseFall;
                }
                case 1: {
                    const addedHighLow = Object.assign(cloned, {
                        contract_category_display: 'Higher/Lower',
                        contract_category: 'higherlower',
                    });
                    return addedHighLow;
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
            if (state.has(action.symbol)) {
                return state;
            }

            const optionsWithRiseFall = splitRiseFallAndHighLow(action.options);
            return state.set(action.symbol, optionsWithRiseFall);
        }
        case TRADING_OPTIONS_ERROR: {
            return state.setIn([action.symbol, 'error'], action.err);
        }
        default: {
            return state;
        }
    }
};
