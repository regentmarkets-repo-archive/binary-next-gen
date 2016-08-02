import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-storage';
import { enableDevTools } from './DevTools';
import rootReducer from '../_reducers';
import actionsToCache from './actionsToCache';
import storageEngine from './storageEngine';
import removeNullMiddleware from './removeNullMiddleware';
import immutableMerger from 'redux-storage-merger-immutablejs';
import createSagaMiddleware from 'redux-saga';

import tradeParamsSaga from '../trade-params/saga/TradeParamSaga';

const storageMiddleware = storage.createMiddleware(storageEngine, [], actionsToCache);
const storageReducer = storage.reducer(rootReducer, immutableMerger);
const storageLoader = storage.createLoader(storageEngine);

const sagaMiddleware = createSagaMiddleware();
const finalCreateStore = compose(
    applyMiddleware(removeNullMiddleware, thunkMiddleware, storageMiddleware, sagaMiddleware),
    enableDevTools()
)(createStore);

export const store = finalCreateStore(storageReducer);

sagaMiddleware.run(tradeParamsSaga);

export const rehydratedStorePromise = () => storageLoader(store).then(() => store);

import * as allActions from '../_actions';
export const actions = bindActionCreators(allActions, store.dispatch);
