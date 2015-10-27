import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';
import DevTools from './DevTools';

const finalCreateStore = compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&]+)\b/
        )
    )
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../_reducers', () =>
            store.replaceReducer(require('../_reducers'))
        );
    }

    return store;
}


// const reducer = compose(
//     mergePersistedState()
// )(reducers);
//
// const storage = compose(
//     filter('nested.key')
// )(adapter(window.localStorage));
//
// const finalCreateStore = compose(
//     devTools(),
//     persistState(storage, 'my-storage-key')
// )(createStore);
//
// const store = finalCreateStore(reducer);
