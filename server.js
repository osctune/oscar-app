const express = require('express');
const app = express();

// Get enviorment variables.
const {
    PORT = 3000,
} = process.env;

// Webpack config.
const config = require('./webpack.dev.js');

// Require modules.
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

// Create webpack compiler.
const compiler = webpack(config);

// Apply middleware.
app.use('/', webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

// Start server.
app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});