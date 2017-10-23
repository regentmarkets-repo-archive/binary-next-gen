const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postCssModules = require('postcss-modules');
const env = process.env.NODE_ENV;

module.exports = {
    devtool: env === 'source-map',
    entry: './src',
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'app.js',
    },
    plugins: env === 'production' ? [
        // new ProgressBarPlugin({ width: 100 }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        //new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
    ] : [
        new ProgressBarPlugin({ width: 100 }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new WebpackNotifierPlugin({ title: 'Next-gen Build' }),
        new ExtractTextPlugin('styles.css'),
        // new webpack.PrefetchPlugin('redux-storage/build/index.js'),
    ],
    module: {
        loaders: [
            {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{loader: 'css-loader', options: { minimize: true } }, 'sass-loader']
              })
            },
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader'] },
            // { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
            // { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]' },
            { test: /\.css$/, use: [ { loader: "style-loader" }, { loader: "css-loader" }, ] },
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
