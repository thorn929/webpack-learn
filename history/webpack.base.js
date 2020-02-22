// node 写出来的  node写法运行 
let path = require('path') // 内置
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let Optimize = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')
// 模块 happypack 可以实现多线程来打包
let Happypack = require('happypack')

// 1. cleanWebpackPlugin  // 打包前删除dist 但是不知为何未删除
// 2. copyWebpackPlugin  // 把文件打包到dist 比如 doc
// 3. bannerPlugin 内置   // 版权问题
module.exports = {
    devServer: { // 开发服务器的设置
        // hot: true,
        port: 3000,
        open: true,
        // progress: true,
        contentBase: './dist',
        // compress: true
        // 1. 有服务端 不想用代理， 能不能在服务端中启动webapck 端口用服务端接口
        // 2. 只想单纯模拟数据
        // before(app) { // 钩子
        //     app.get('/user', (req, res) => {
        //         res.json({
        //             name: '测试数据1before'
        //         })
        //     })
        // },
        // // proxy: {
        // //     '/api': {
        //         target: 'http://localhost:3000',
        //         pathRewrite: {
        //             '/api': ''
        //         }
        //     }
        // }
    },
    // 源码映射，帮我们调试代码，
    // 1. 会单独生成一个sourcemap文件， 出错了 会标识当前错的当前行  大 和 全
    // devtool: 'source-map',
    // 2. 不会产生单独的文件， 但是可以显示行和列 ，
    // devtool: 'eval-source-map',
    // 3. 不会产生列 但是是一个单独的映射文件, 产生后可以保留起来
    // devtool: 'cheap-module-source-map', 
    // 4. 不会产生文件 集成在打包后的文件中，不会产生列
    devtool: 'cheap-module-eval-source-map',  
    // resolve: { // 解析第三方包 common  没写完
    //     modules: [path.resolve('node_modules'), path]
    // },
    optimization: { 
        // 优化项 压缩
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new Optimize()
        ], 
        splitChunks: { // 多页面时候应用，分割代码块
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                }
            },
            vendor: { // 第三方
                priority: 1,
                test: /node_modules/,
                chunks: 'initial',
                minSize: 0,
                minChunks: 2
            }
        }
    },
    // watch: true, // 时时打包
    // watchOptions: {
    //     poll: 1000, // 每秒
    //     aggregateTimeout: 2, // 防抖 一直输入代码
    //     ignored: /node_modules/ 
    // },
    // mode: 'development', // production || development
    // entry: './src/index.js', // 入口
    entry: {
        index: './src/index',
        other: './src/other.js'
    },
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名, 哈希 且只显示8位
        // __dirname 以当前目录下
        path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径 , 
        // publicPath: 'https://www.baidu.com'
    },
    plugins: [ // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: false, // 双引号
            },
            hash: true
        }),
        new CleanWebpackPlugin(),
        // 抽离css
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new CopyWebpackPlugin([
            {
                from: 'doc', to: './'
            }
        ]),
        new webpack.BannerPlugin('----------thorn------'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),
            FLAG: 'true'
        }),
        // 比如我需要引入一个moment语言 ，而不是所有的都需要引入, 把locale忽略, 但是如果需要 可以手动引入
        new webpack.IgnorePlugin(
            /\.\/locale/, /moment/
        ),
        new Happypack({
            id: 'js',
            use: [
                {
                    loader: 'babel-loader',
                    options: { // 用babel-loader 把es6转化为es5
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            ]
        })
    ],
    module: {
        noParse: /jquery/,  // 不去解析jquery中的依赖库
        rules: [
            // laoder 特点  希望单一，
            // loader 用法  字符串 只用一个loader
            // 多个loader需要数组
            // loader 顺序 默认 从右向左执行, 从下到上
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre' // 改变执行顺序，先加载js 应该放在后面  previous
            //         }
            //     }
            // },
            {
                test: /\.html$/,
                use: 'html-withimg-loader' // html 中 src 引入图片 loader
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                // use: 'file-loader'  // 一般不用它 
                // 做一个限制，当我们图片小于多少k 用base64转化
                // 否则用file-loader 产生真实的图片
                use: {
                    loader: 'url-loader',
                    options: {
                        limitcc: 1,
                        outputPath: '/img/'
                    }
                }
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: { // 用babel-loader 把es6转化为es5
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime",
                            
                        ]
                    }
                }, 'Happypack/loader?id=js'],
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/
            },
            // css-loader  解析 @import这种语法
            // style-loader 把css 插入到head的标签中
            // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // loader 可以写成对象方式, 它的优势是可以添加参数，比如在页面写入style被引入style覆盖问题
            { 
                test: /\.css$/, 
                use: [
                    // 创建link标签
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ] 
            },
            { 
                // 可以处理less文件
                test: /\.less$/, 
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         // 注意： 版本问题 这个参数不一致， 但是报错已经很友好了
                    //         // insert: 'top'
                    //     }
                    // }, 
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //       // 只在开发模式中启用热更新
                    //       hmr: true,
                    //       // 如果模块热更新不起作用，重新加载全部样式
                    //       reloadAll: true
                    //     },
                    //   },
                    MiniCssExtractPlugin.loader,
                    'css-loader', // @import -> 解析路径
                    'postcss-loader',
                    'less-loader' // less -> css
                ] 
            },
        ]
    }
}