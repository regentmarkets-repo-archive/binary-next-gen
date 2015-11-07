if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.dev'); // need a better syncing with dev, less repetition
} else {
    module.exports = require('./Root.dev');
}
