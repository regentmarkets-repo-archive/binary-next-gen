import createEngine from 'redux-storage-engine-localstorage';
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
]);

export default debounce(filteredEngine, 1000);
