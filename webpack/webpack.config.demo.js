const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',

    entry: {
        demo: ['webpack/hot/dev-server', './demo/js/demo.js'],
    },

    output: {
        filename: 'js/bundle.js',
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
