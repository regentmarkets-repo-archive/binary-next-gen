const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const autoprefixer = require('autoprefixer');

const env = process.env.NODE_ENV;

module.exports = {
    devtool: env === 'production' ? 'source-map' : 'eval',
    entry: './src',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/',
    },
    plugins: env === 'production' ? [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // dead_code: true,
            },
        }),
    ] : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new WebpackNotifierPlugin({ title: 'Next-gen Build' }),
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.css$/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' },
        ],
        // noParse: /babel/,
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
};
