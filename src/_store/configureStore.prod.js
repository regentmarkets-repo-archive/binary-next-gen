import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../_reducers';
import storage from 'redux-storage';
import createEngine from 'redux-storage/engines/localStorage';

const reducer = storage.reducer(rootReducer);

const engine = createEngine('binary-prod');

const middleware = storage.createMiddleware(engine);

const finalCreateStore = applyMiddleware(middleware)(createStore);

const initStore = finalCreateStore(reducer);

const load = storage.createLoader(engine);

export const loadedStorePromise = load(initStore);
export const store = initStore;
