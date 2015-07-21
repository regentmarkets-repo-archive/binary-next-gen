import { FILTER_MARKETS } from '../_constants/ActionTypes';

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

    const doFilterMarkets = (query = state.query) => {

        query = query.toLowerCase();

        return state.allMarkets.filter(m =>
            query == '' ||
            m.id.toLowerCase().includes(query) ||
            m.name.toLowerCase().includes(query)
        );
    };

    switch (action.type) {
        case FILTER_MARKETS:
            return {
                ...state,
                shownMarkets: doFilterMarkets(action.query),
                query: action.query
            };

        default:
            return state;
    }
}
