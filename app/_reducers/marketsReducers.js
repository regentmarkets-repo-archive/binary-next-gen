import { Map } from 'immutable';
import { FILTER_MARKETS, UPDATE_MARKETS, SERVER_DATA_ACTIVE_SYMBOLS } from '../_constants/ActionTypes';

const initialState = new Map({
    active: [],
    query: '',
    shownMarkets: [],
});

export default (state = initialState, action) => {
    const doFilter = (markets = state.allMarkets, query = state.query) => {
        const queryLc = query.toLowerCase();
        return markets.filter(m =>
            queryLc === '' ||
            m.id.toLowerCase().includes(queryLc) ||
            m.name.toLowerCase().includes(queryLc)
        );
    };

    switch (action.type) {
        case SERVER_DATA_ACTIVE_SYMBOLS: {
            const data = action.serverResponse.data;
            return state.set('active', data);
        }
        case FILTER_MARKETS:
            return {
                ...state,
                shownMarkets: doFilter(state.markets, action.query),
                query: action.query,
            };
        case UPDATE_MARKETS:
            return {
                ...state,
                shownMarkets: doFilter(state.markets, action.query),
                query: action.query,
            };
        default:
            return state;
    }
};
