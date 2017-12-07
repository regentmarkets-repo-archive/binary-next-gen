const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development') 
            }
        }),
        new ProgressBarPlugin({ width: 100 }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new WebpackNotifierPlugin({ title: 'Next-gen Build' }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'www'),
      compress: true,
      port: 3000,
      disableHostCheck: true,      
      hot: true,
    }
});
