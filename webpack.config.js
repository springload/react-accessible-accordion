// Used to run webpack dev server to test the demo in local
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => ({
    mode: options.mode,
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'demo/js/demo.tsx'),
    output: {
        path: path.resolve(__dirname, 'pages'),
        filename:
            options.mode === 'production'
                ? '[name][chunkhash].js'
                : '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    },

    plugins: [
        options.mode === 'development'
            ? new webpack.HotModuleReplacementPlugin()
            : () => {},
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'demo/index.html'),
        }),
    ],

    devServer: {
        contentBase: './demo',
    },
});
