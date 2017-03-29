const path = require('path');

const sourcePath = path.join(__dirname, '..', 'src');
const distPath = path.join(__dirname, '..', 'dist');

module.exports = {
    context: sourcePath,
    devtool: 'source-map',
    entry: {
        'react-accessible-accordion': path.join(sourcePath, 'index.js'),
    },
    output: {
        path: distPath,
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'react-accessible-accordion',
    },
    plugins: [],
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
        ],
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};
