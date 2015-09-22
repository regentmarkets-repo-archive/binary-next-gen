import { FILTER_MARKETS, UPDATE_MARKETS } from '../_constants/ActionTypes';

const initialState = {
    allMarkets: [],
    query: '',
    shownMarkets: [],
};

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
