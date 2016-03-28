const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    devtool: 'eval',
    entry: [
        './src',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new WebpackNotifierPlugin({ title: 'Next-gen Build' }),
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
