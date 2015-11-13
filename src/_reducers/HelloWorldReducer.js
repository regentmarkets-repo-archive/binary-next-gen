import StateStorage from '../_store/StateStorage';

const SayHello = 'Hello';
const SayHi = 'Hi';
const NoSayHello = '';

const initialState = new Map({subject: 'World'});

export default (state=initialState, action=null) => {
    switch (action.type) {
        case SayHello: return state.set('greet', 'Hello');
        case NoSayHello: return state.set('greet', '');
        case SayHi: return state.set('greet', 'Hi');
    }
}
