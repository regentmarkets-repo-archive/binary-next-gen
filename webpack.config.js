var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel?stage=0', 'eslint-loader'],
            exclude: /node_modules/
        }, {
            test: /react-sparklines/,
            loaders: ['react-hot', 'babel?stage=0']
        },          {
            test: /\.css?$/,
            loaders: ['style', 'raw']
        }]
    }
};
