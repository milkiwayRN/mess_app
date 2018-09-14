const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserPlugin = require('webpack-browser-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const chromeUserDataDir = '~/chrome-data';

module.exports = env => {
    let buildDir = '../backend/static';
    if (env && env.output) {
        buildDir = env.output;
    }
    const buildPath = path.resolve(__dirname, buildDir);

    const proxyTarget = 'http://localhost:8999';
    const pathRewrite = null;

    const config = {
        entry: './app/index.js',
        output: {
            filename: 'bundle.js',
            path: buildPath,
            library: 'index',
            publicPath: '/static/',
        },

        watchOptions: {
            poll: true,
            ignored: /node_modules/,
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: 'index.html',
                inject: 'body',
            }),
            new ExtractTextPlugin('styles.css'),
            new webpack.HotModuleReplacementPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/i,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ExtractTextPlugin.extract({
                        fallback: { loader: 'style-loader' },
                        use: [
                            {
                                loader: 'css-loader',
                            },
                        ],
                    }),
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                            {
                                loader: 'sass-loader',
                                query: {
                                    sourceMap: false,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(jpe?g|png|svg|gif|woff|woff2|eot|ttf)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'assets/',
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.json', '.css'],
        },
        devServer: {
            contentBase: buildDir,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,

            proxy: [{
                context: [
                    '/api',
                    '/login',
                ],
                target: proxyTarget,
                secure: false,
                pathRewrite,
            },
            ],

            headers: {
                'Access-Control-Allow-Origin': '*',
            },

        },
    };

    const envOptions = {
        DEBUG: false,
        host: 'localhost',
        port: 8080,
        NODE_ENV: 'development',
    };

    if (env && env.production) {
        config.plugins.unshift(new CleanWebpackPlugin('*', { root: buildPath }));
        config.plugins.push(new UglifyJSPlugin({
            sourceMap: true,
        }));
        envOptions.NODE_ENV = 'production';
        config.devtool = 'source-map';
    }
    else {
        config.plugins.push(
            new BrowserPlugin({
                openOptions: {
                    app: [
                        'chrome',
                        '--args',
                        '--ignore-certificate-errors',
                        `--user-data-dir=${path.resolve(chromeUserDataDir)}`,
                        '--disable-web-security', // to enable CORS
                        // to let Chrome create and store here developers plugins, settings, etc.
                    ],
                },
            }),
        );
        config.devtool = 'eval-source-map';
    }

    config.plugins.push(new webpack.EnvironmentPlugin(envOptions));

    return config;
};
