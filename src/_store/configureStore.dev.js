import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';


const reducer = compose(
    mergePersistedState()
)(rootReducer);

const storage = compose(
    filter('nested.key')
)(adapter(window.localStorage));

const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    persistState(storage, 'my-storage-key')
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
