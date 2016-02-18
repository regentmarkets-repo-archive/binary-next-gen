module.exports = (wallaby) => ({
    files: [{
        pattern: 'src/**/*.js*',
        load: false,
    }, {
        pattern: 'src/**/__tests__/*.js',
        ignore: true,
    }],
    tests: [
        'src/**/__tests__/*.js',
    ],
    env: {
        type: 'node',
    },
    testFramework: 'mocha',
    bootstrap: () => {
        global.regeneratorRuntime = require('babel-runtime/regenerator').default;
    },
    compilers: {
        '**/*.js': wallaby.compilers.babel({
            presets: [
                'react',
                'es2015',
                'stage-1',
            ],
            plugins: [
                'transform-function-bind',
                'transform-decorators-legacy',
            ],
        }),
    },
});
