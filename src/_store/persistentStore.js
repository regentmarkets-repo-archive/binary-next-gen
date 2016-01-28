import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-storage';
import { enableDevTools } from './DevTools';
import rootReducer from '../_reducers';
import actionsToCache from './actionsToCache';
import storageEngine from './storageEngine';

const storageMiddleware = storage.createMiddleware(storageEngine, [], actionsToCache);

const storageReducer = storage.reducer(rootReducer);
const storageLoader = storage.createLoader(storageEngine);

const finalCreateStore = compose(
    applyMiddleware(storageMiddleware, thunkMiddleware),
    enableDevTools()
)(createStore);

export const store = finalCreateStore(storageReducer);
export const rehydratedStorePromise = storageLoader(store).then(() => store);
