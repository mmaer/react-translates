const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index',
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        hot: true,
        contentBase: resolve(__dirname),
        publicPath: '/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                IS_WEBPACK: JSON.stringify(true),
                NODE_ENV: JSON.stringify('development'),
                RUN_MODE: JSON.stringify('es'),
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: resolve(__dirname),
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        fs: '{}',
        'https-proxy-agent': '{}',
        module: '{}',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
};
