import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-storage';
import { enableDevTools } from './DevTools';
import rootReducer from '../_reducers';
import actionsToCache from './actionsToCache';
import storageEngine from './storageEngine';
import immutableMerger from 'redux-storage-merger-immutablejs';

const storageMiddleware = storage.createMiddleware(storageEngine, [], actionsToCache);

const storageReducer = storage.reducer(rootReducer, immutableMerger);
const storageLoader = storage.createLoader(storageEngine);

const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, storageMiddleware),
    enableDevTools()
)(createStore);

export const store = finalCreateStore(storageReducer);
export const rehydratedStorePromise = storageLoader(store).then(() => store);
