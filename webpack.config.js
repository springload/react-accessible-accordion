// Used to run webpack dev server to test the demo in local
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => ({
    mode: options.mode,
    output: {
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
                use: [
                    options.mode === 'production'
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(ico|svg)$/,
                loaders: ['file-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css',
        }),
    ],
});
