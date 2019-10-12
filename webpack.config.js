const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const plugins = [new HtmlWebpackPlugin({
    template: 'client/index.html',
    filename: 'index.html',
    inject: 'body'
})];

module.exports = (env) => {

    const environment = env || 'production';

    if (env === 'production') {

        const webpack = require('webpack');
        
        plugins.push(
            new OptimizeJsPlugin({
                sourceMap: false
            })
        )
    }

    return {

        mode: environment,
        entry: './client/index.js',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'app.'+ environment +'.bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.css$/,
                    use: [{
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                               modules: true
                           }
                        }
                    ]
                }
            ]
        },
        plugins,
        devServer: {
            proxy: {
                '/socket.io': {
                    target: 'http://localhost:3000',
                    ws: true
                }
            }
        }
    };    
};
