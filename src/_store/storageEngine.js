import filter from 'redux-storage-decorator-filter';
import debounce from 'redux-storage-decorator-debounce';
import createEngine from './redux-storage-engine-localstorage-multi';

const engine = createEngine('binary');

const filteredEngine = filter(engine, [
    ['boot'],
    ['account'],
    ['assets'],
    ['settings'],
    ['realityCheck'],
    ['watchlist'],
    ['workspace'],
], [
    ['workspace', 'activeTradeIndex'],
]);

export default debounce(filteredEngine, 1000);
