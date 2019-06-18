const baseConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = Object.assign(baseConfig, {
    entry: {
        app: './src/index.js',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'OSCAR - development',
            template: 'src/ejs/index.dev.ejs',
            API_URL: process.env.API_URL,
            REDIRECT_URL: process.env.REDIRECT_URL,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});