const path = require('path');
const nodeExternals = require('webpack-node-externals');
const nodemonPlugin = require( 'nodemon-webpack-plugin' );

module.exports = {
    entry: './src/application/app.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    watch: true,
    target: 'node',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [
        nodeExternals()
    ],
    plugins:[
        new nodemonPlugin()
    ]
};