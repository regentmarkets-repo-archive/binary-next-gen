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
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
        new ProgressBarPlugin({ width: 100 }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new WebpackNotifierPlugin({ title: 'Next-gen Build' }),
        new ExtractTextPlugin('styles.css'),
        // new webpack.PrefetchPlugin('redux-storage/build/index.js'),
    ],
    module: {
        loaders: [
            (env === 'production') ?  {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [{loader: 'css-loader', options: { minimize: true } }, 'sass-loader']
                })
              } : {
                test: /\.scss$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" },
                  { loader: "sass-loader" }
                ]
               },
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader'] },
            { test: /\.css$/, use: [ { loader: "style-loader" }, { loader: "css-loader" }, ] },
            { test: /\.svg$/, loader: 'babel-loader?presets[]=es2015,presets[]=react!svg-react-loader' },
        ],
    },
    externals: {
      'jquery' : 'jQuery'
    },
    devServer: {
      contentBase: path.join(__dirname, "www"),
      compress: true,
      port: 3000,
      hot: true
    }
    // postcss: () => [
    //     precss,
    //     postCssModules,
    //     autoprefixer,
    // ],
};
