import createEngine from './redux-storage-engine-localstorage-multi';
import filter from './redux-storage-decorator-filter';
import debounce from 'redux-storage-decorator-debounce';

const engine = createEngine('binary');

const filteredEngine = filter(engine, [
    ['boot'],
    ['account'],
    ['assetPicker'],
    ['assets'],
    ['transactions'],
    ['settings'],
    ['watchlist'],
    ['workspace'],
], [
    ['workspace', 'selectedAsset'],
    ['workspace', 'activeTradeIndex'],
]);

export default debounce(filteredEngine, 1000);
