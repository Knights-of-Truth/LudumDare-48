const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const DirectoryTreePlugin = require('directory-tree-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/main.ts',
    devtool: 'source-map',
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
        path: path.resolve(__dirname, 'build/dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            DEVELOPMENT: false,
            PACKAGED: true,
        }),
        new DirectoryTreePlugin({
            dir: './assets',
            path: './src/assets.json',
            extensions: /\.(json|png|jpg|bmp)$/i,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'public/prod', to: path.resolve(__dirname, 'build'), force: true },
                { from: 'assets', to: path.resolve(__dirname, 'build/assets'), force: true },
            ],
        }),
    ],
}