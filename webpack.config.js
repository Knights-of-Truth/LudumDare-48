const path = require('path');

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
                test: /\.(png|svg|jpg|jpeg|gif|json)$/i,
                type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: { "path": require.resolve("path-browserify") },
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
}