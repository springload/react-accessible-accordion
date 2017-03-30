const webpack = require('webpack');
const config = require('./webpack.config.demo.js');

config.entry = {
    demo: './demo/js/demo.js',
};

config.output = {
    filename: 'pages/js/bundle.js',
};

config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true,
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
    }),
];
config.watch = false;
config.devServer = {};

module.exports = config;
