import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../_reducers';
import storage from 'redux-storage';
import createEngine from 'redux-storage/engines/localStorage';
import * as ActionTypes from '../_constants/ActionTypes';

const actionsToCache = [
    ActionTypes.ADD_TOKEN,
    ActionTypes.REMOVE_TOKEN,
    ActionTypes.SERVER_AUTH_FAILED,
    ActionTypes.SERVER_DATA_ASSET_INDEX,
    ActionTypes.SERVER_DATA_BALANCE,
    ActionTypes.SERVER_DATA_BUY,
    ActionTypes.SERVER_DATA_PAYOUT_CURRENCIES,
    ActionTypes.SERVER_DATA_ACCOUNT_LIMITS,
    ActionTypes.SERVER_DATA_ACCOUNT_SETTINGS,
    ActionTypes.WATCHLIST_FAVOR_ASSET,
    ActionTypes.WATCHLIST_UNFAVOR_ASSET,
];

const reducer = storage.reducer(rootReducer);
const engine = createEngine('binary');
const filteredEngine = storage.decorators.filter(engine, [
    ['account'],
    ['assetSelector'],
    ['assets'],
    ['profitTable'],
    ['statement'],
    ['settings'],
    ['watchlist'],
]);

const debouncedFilteredEngine = storage.decorators.debounce(filteredEngine, 1000);
const storageMiddleware = storage.createMiddleware(debouncedFilteredEngine, [], actionsToCache);

const finalCreateStore = compose(
    applyMiddleware(storageMiddleware, thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);
const initStore = finalCreateStore(reducer);
const load = storage.createLoader(debouncedFilteredEngine);


export const rehydratedStorePromise = load(initStore).then(() => {return initStore;});
export const store = initStore;
