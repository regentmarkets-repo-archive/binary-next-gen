// require('babel-polyfill');
// require('babel-plugin-transform-regenerator');

module.exports = wallaby => ({
    files: [{
        pattern: 'src/**/*.js*',
        load: false,
    }, {
        pattern: 'src/**/__tests__/*.js',
        ignore: true,
    }],
    tests: [
        './src/*/__tests__/*.js',
        './src/*/*/__tests__/*.js',
    ],
    env: {
        type: 'node',
    },
    testFramework: 'jest',
    bootstrap: () => {
        global.regeneratorRuntime = global.regeneratorRuntime;
    },
    compilers: {
        '**/*.js': wallaby.compilers.babel({
            presets: [
                'react',
                'es2015',
                'stage-1',
            ],
            plugins: [
                'transform-decorators-legacy',
            ],
        }),
    },
});
