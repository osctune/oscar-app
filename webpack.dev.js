const baseConfig = require('./webpack.common');

module.exports = Object.assign(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
});