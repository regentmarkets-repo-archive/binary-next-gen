import { FILTER_MARKETS, UPDATE_MARKETS } from '../_constants/ActionTypes';

const marketsList =  [{
    id: 'eur50',
    name: 'Euro 50 Index'
}, {
    id: 'wsidx',
    name: 'Wall Streen Index'
}, {
    id: 'danone',
    name: 'Danone'
}, {
    id: 'loreal',
    name: 'L\'Oreal'
}, {
    id: 'vivendi',
    name: 'Vivendi'
}, {
    id: 'oil',
    name: 'Oil/USD'
}, {
    id: 'gold',
    name: 'Gold/USD'
}, {
    id: 'platinum',
    name: 'Platinum/USD'
}, {
    id: 'rnd100',
    name: 'Random 100 Index'
}, {
    id: 'rndsun',
    name: 'Random Sun'
}];

const initialState = {
    allMarkets: marketsList,
    query: '',
    shownMarkets: marketsList
};

export default function markets(state = initialState, action) {

    const doFilter = (markets = state.allMarkets, query = state.query) => {

        query = query.toLowerCase();

        return markets.filter(m =>
            query == '' ||
            m.id.toLowerCase().includes(query) ||
            m.name.toLowerCase().includes(query)
        );
    };

    switch (action.type) {

        case FILTER_MARKETS:
            return {
                ...state,
                shownMarkets: doFilter(state.markets, action.query),
                query: action.query
            };

        case UPDATE_MARKETS:
            return {
                ...state,
                allMarkets: action.markets,
                shownMarkets: doFilter(action.markets, state.query)
            };

        default:
            return state;
    }
}
