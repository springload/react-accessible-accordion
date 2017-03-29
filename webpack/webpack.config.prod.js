const webpack = require('webpack');
const config = require('./webpack.config.js');

config.watch = false;
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
    },
    mangle: {
        screw_ie8: true,
    },
    output: {
        comments: false,
        screw_ie8: true,
    },
    sourceMap: true,
}));

module.exports = config;
