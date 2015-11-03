var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './src'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    }
};
