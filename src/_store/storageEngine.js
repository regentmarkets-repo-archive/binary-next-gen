import createEngine from './redux-storage-engine-localstorage-multi';
import filter from 'redux-storage-decorator-filter';
import debounce from 'redux-storage-decorator-debounce';

const engine = createEngine('binary');

const filteredEngine = filter(engine, [
    ['account'],
    ['assetPicker'],
    ['assets'],
    ['transactions'],
    ['settings'],
    ['watchlist'],
    ['workspace'],
]);

export default debounce(filteredEngine, 1000);
