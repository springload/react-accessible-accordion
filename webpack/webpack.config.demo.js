const path = require('path');
const webpack = require('webpack');

const demoPath = path.join(__dirname, '..', 'demo');

module.exports = {
    devtool: 'source-map',

    entry: {
        demo: ['webpack/hot/dev-server', `${demoPath}/js/demo.js`],
    },

    output: {
        filename: 'demo/js/bundle.js',
    },

    module: {
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                }],
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.js'],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        contentBase: './demo',
    },
};
