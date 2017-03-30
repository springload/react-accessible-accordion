const webpack = require('webpack');
const config = require('./webpack.config.js');

config.devtool = 'cheap-module-source-map';
config.watch = true;
config.entry = {
    demo: ['webpack/hot/dev-server', '../demo/js/demo.js'],
};

config.output = {
    filename: 'js/bundle.js',
};

config.resolve = {
    extensions: ['.js'],
};

config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
];

config.devServer = {
    contentBase: './demo',
};

// Turn off performance hints during development because we don't do any
// splitting or minification in interest of speed. These warnings become
// cumbersome.
config.performance = {
    hints: false,
};

module.exports = config;
