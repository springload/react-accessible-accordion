const config = require('./webpack.config.demo.js');

config.devtool = false;
config.entry = {
    demo: './demo/js/demo.js',
};

config.output = {
    filename: 'pages/js/bundle.js',
};

config.plugins = [];
config.devServer = {};

module.exports = config;
