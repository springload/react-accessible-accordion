const config = require('./webpack.config.demo.js');

config.devtool = 'source-map';
config.entry = {
    demo: './demo/js/demo.js',
};

config.output = {
    filename: 'pages/js/bundle.js',
};

config.plugins = [];

module.exports = config;
