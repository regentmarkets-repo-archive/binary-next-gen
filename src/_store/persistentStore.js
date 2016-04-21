import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-storage';
import { enableDevTools } from './DevTools';
import rootReducer from '../_reducers';
import actionsToCache from './actionsToCache';
import storageEngine from './storageEngine';
import removeNullMiddleware from './removeNullMiddleware';
import immutableMerger from 'redux-storage-merger-immutablejs';
import createDebounce from 'redux-debounced';

const storageMiddleware = storage.createMiddleware(storageEngine, [], actionsToCache);
const storageReducer = storage.reducer(rootReducer, immutableMerger);
const storageLoader = storage.createLoader(storageEngine);

const debounceMiddleware = createDebounce();

const finalCreateStore = compose(
    applyMiddleware(removeNullMiddleware, debounceMiddleware, thunkMiddleware, storageMiddleware),
    enableDevTools()
)(createStore);

export const store = finalCreateStore(storageReducer);
export const rehydratedStorePromise = storageLoader(store).then(() => store);
