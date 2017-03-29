const config = require('./webpack.config.demo.js');

config.output = {
    filename: 'pages/js/bundle.js',
};

module.exports = config;
