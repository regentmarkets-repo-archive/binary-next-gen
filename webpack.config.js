const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postCssModules = require('postcss-modules');
const env = process.env.NODE_ENV;

module.exports = {
    devtool: env === 'production' ? 'eval' : 'source-map',
    entry: './src',
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'app.js',
    },
    plugins: env === 'production' ? [
        new ProgressBarPlugin({ width: 100 }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        //new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: env !== 'production',
        })
    ] : [
        new ProgressBarPlugin({ width: 100 }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new WebpackNotifierPlugin({ title: 'Next-gen Build' }),
        // new webpack.PrefetchPlugin('redux-storage/build/index.js'),
    ],
    module: {
        loaders: [
            { test: /\.(scss)$/, loader: 'stylelint-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
            { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]' },
            { test: /\.svg$/, loader: 'babel-loader?presets[]=es2015,presets[]=react!svg-react-loader' },
            // { test: /\.css$/, exclude: /node_modules/, loader: 'style!css!postcss?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]' },
            // { test: /\.scss$/, loader: ExtractTextPlugin.extract( 'css-loader?modules' + '&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' + '!postcss-loader' + '!sass' ), },
        ],
    },
    externals: {
      'jquery' : 'jQuery'
    },
    devServer: {
      contentBase: path.join(__dirname, "www"),
      compress: true,
      port: 3000
    }
    // postcss: () => [
    //     precss,
    //     postCssModules,
    //     autoprefixer,
    // ],
};
