import storage from 'redux-storage';
import createEngine from 'redux-storage/engines/localStorage';

const engine = createEngine('binary');

const filteredEngine = storage.decorators.filter(engine, [
    ['account'],
    ['assetPicker'],
    ['assets'],
    ['profitTable'],
    ['statement'],
    ['settings'],
    ['watchlist'],
]);

export default storage.decorators.debounce(filteredEngine, 1000);
