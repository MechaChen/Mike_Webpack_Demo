var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/[name].css');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('NODE_ENV', process.env.NODE_ENV);

var config = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, 'src'),
	entry: {
        index: './js/index.js',
        about: './js/about.js'
    },
	output: {
        path: path.resolve(__dirname, 'dist'),
        // 可以到桌面上，跟後端的 client 資料夾整合
        // path: path.resolve(__dirname, '../dist'),
        // 可以變不同名稱
        // path: path.resolve(__dirname, 'App'),
		filename: './js/[name].js?[hash:8]',
    },
    module: {
        rules: [
            // {
            //     test: /\.(sass|scss)$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader',
            //     ]
            // },
            // {
            //     test: /.html$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[path][name].[ext]'
            //             } 
            //         }
            //     ]
            // },
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        compress: true,
        port: 3000,
        stats: {
            assets: true,
            cached: false,
            chunkModules: false,
            chunkOrigins: false,
            chunks: false,
            colors: true,
            hash: false,
            modules: false,
            reasons: false,
            source: false,
            version: false,
            warnings: false
        },
    },
    plugins: [
        extractCSS,
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' }
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack前端自動化開發',
            filename: 'index.html',
            template: 'html/index.html',
            viewport: 'width=640, user-scalable=no',
            description: 'Webpack前端自動化開發，讓你熟悉現代前端工程師開發的方法',
            Keywords: 'Webpack前端自動化開發、前端、工程師、線上教學、教學範例',
            chunks: ['vendor', 'index'],
        }),
        new HtmlWebpackPlugin({
            title: 'about',
            filename: 'about.html',
            template: 'html/about.html',
            chunks: ['vendor', 'about'],
            viewport: 'width=1024, user-scalable=no',
            description: 'asldjfiewurlk;xzvl',
            Keywords: 'Webpack前端自動化開發、前端、工程師、線上教學、教學範例',
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
}

if (process.env.NODE_ENV === 'development') {
    config.module.rules.push(
        {
            test: /\.(sass|scss)$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }
    )
}

if (process.env.NODE_ENV === 'production') {
    config.module.rules.push(
        {
            test: /\.(sass|scss)$/,
            use: extractCSS.extract([
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ])
        }
    )
}

module.exports = config;