import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';
import {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';


const reducer = compose(
    mergePersistedState()
)(rootReducer);

const storage = compose(
)(adapter(window.localStorage));

const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    persistState(storage, 'binary')
)(createStore);

const configureStore = initialState => {
    const store = finalCreateStore(reducer, initialState);

    if (module.hot) {
        module.hot.accept('../_reducers', () =>
            store.replaceReducer(require('../_reducers'))
        );
    }

    return store;
};

export default configureStore;
