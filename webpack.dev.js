const path = require('path');
const webpack = require('webpack');
const DirectoryTreePlugin = require('directory-tree-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: { "path": require.resolve("path-browserify") },
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.DefinePlugin({
            DEVELOPMENT: true,
            PACKAGED: false,
        }),
        new DirectoryTreePlugin({
            dir: './assets',
            path: './src/assets.json',
            extensions: /\.(json|png|jpg|bmp)$/i,
        })
    ],
}