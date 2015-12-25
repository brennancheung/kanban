var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
    app:   `${__dirname}/app`,
    build: `${__dirname}/build`
};

var common = {
    entry: PATHS.app,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test:    /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: PATHS.app
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({title: 'Kanban'})
    ]
};

var dev = {
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot:       true,
        inline:    true,
        progress:  true,
        stats:     'errors-only',
        host:      process.env.HOST,
        port:      process.env.PORT || 4000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = (TARGET == 'start' || !TARGET) ? merge(common, dev) : common;
