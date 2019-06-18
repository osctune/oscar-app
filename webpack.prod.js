const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CopyPlugin([
            { from: './public', to: './' },
        ]),
        new HtmlWebpackPlugin({
            title: 'OSCAR',
            template: 'src/ejs/index.prod.ejs',
            API_URL: process.env.API_URL,
            REDIRECT_URL: process.env.REDIRECT_URL,
        }),
    ]
});