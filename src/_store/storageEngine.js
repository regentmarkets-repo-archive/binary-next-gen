import filter from 'redux-storage-decorator-filter';
import createEngine from './redux-storage-engine-localstorage-multi';

const engine = createEngine('binary');

const filteredEngine = filter(engine, [
    ['boot'],
    ['account'],
    ['settings'],
    ['realityCheck'],
    ['watchlist'],
    ['workspace'],
], ['assets']);

export default filteredEngine;
