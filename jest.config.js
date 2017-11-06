module.exports = {
    setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
    setupFiles: [
        '<rootDir>/src/browserMocks.js',
        'raf/polyfill',
        '<rootDir>/src/_utils/enzyme-setup.js',
    ]
};
