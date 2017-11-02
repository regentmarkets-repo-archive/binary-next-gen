const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'app.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'www'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    'babel-loader',
                    'svg-react-loader'
                ]
            },
        ],
    },
    plugins:[
        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^$/), // remove locales from moment.js
    ],
    externals: {
        'jquery': 'jQuery'
    },
};
