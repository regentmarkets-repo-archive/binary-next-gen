if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod'); // need a better syncing with dev, less repetition
} else {
    module.exports = require('./configureStore.prod');
}
