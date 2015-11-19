import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';

const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

const configureStore = initialState => {
    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../_reducers', () =>
            store.replaceReducer(require('../_reducers'))
        );
    }

    return store;
};

export default configureStore;
