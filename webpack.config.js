const path = require('path') // eslint-disable-line
const webpack = require('webpack') // eslint-disable-line @typescript-eslint/no-var-requires

const PORT = process.env.PORT || 8003
const HOST = process.env.HOST || 'clienteportal2.brms.com.br'

const webpackBase = {
    entry: [
        'react-hot-loader/patch', // activate HMR for React
        `webpack-dev-server/client?http://clienteportal2.brms.com.br`,
        path.resolve(__dirname, 'src', 'app.tsx'),
    ],
    devtool: 'source-map',
    mode: 'development',
    output: {
        filename: 'build.min.js',
        path: path.resolve(__dirname, '..', '..', 'frontend', 'nfe', 'static', 'build'),
        publicPath: `http://${HOST}/`,
        /* publicPath: `http://${HOST}:${PORT}/`, */
        //publicPath: './public/'
    },
    module: {
        rules: [{
                test: /.tsx?$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                noEmit: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                }, ],
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /(\.css)$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            root: path.resolve(__dirname, 'styles'),
                        },
                    },
                ],
            },
            {
                test: /(\.scss)$/,
                use: [{
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            modules: {
                                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                                mode: 'global',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname),
                            },
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            root: path.resolve(__dirname, 'styles'),
                        },
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, 'styles/variables.scss'),
                            sourceMap: true,
                            sourceMapContents: false,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                    esModule: false,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'url-loader',
                options: {
                    includePaths: [__dirname],
                    limit: 100000,
                },
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        jsx: true,
                        esModule: false,
                    },
                }, ],
            },
        ],
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, '..', 'node_modules')],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
        symlinks: true,
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEBUG__: JSON.stringify(true),
            NODE_ENV: JSON.stringify('debug'),
            STORYBOOK: JSON.stringify(false),
            CYPRESS: process.env.CYPRESS ? JSON.parse(process.env.CYPRESS) : false,
            LOCAL_API: process.env.LOCAL_API ? JSON.parse(process.env.LOCAL_API) : true,
            'process.env.NODE_ENV': JSON.stringify('debug'), // Tells React to build in either dev or prod modes
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        host: 'clienteportal2.brms.com.br',
        /* host: '64.225.23.255', */
        port: 8003,
        contentBase: path.resolve(__dirname, '..', '..', 'frontend', 'nfe', 'static'),
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: {
            context: ['/static/css', '/static/fonts'],
            target: `http://${HOST}`,
            /* target: `http://${HOST}:${PORT}`, */
        },
    },
    
}

module.exports = webpackBase