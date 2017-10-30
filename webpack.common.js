const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'www'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: 'css-loader', 
                            options: { minimize: true }
                        }, 
                        'sass-loader'
                    ]
                }),
            },
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
        new ExtractTextPlugin('styles.css'),
        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^$/), // remove locales from moment.js
    ],
    externals: {
        'jquery': 'jQuery'
    },
};
