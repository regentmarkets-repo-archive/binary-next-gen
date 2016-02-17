const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        './src',
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'app.js',
        publicPath: 'public/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.join(__dirname, 'src'),
        }, {
            test: /\.js$/,
            loader: 'eslint-loader',
            include: path.join(__dirname, 'src'),
        }],
    },
};
