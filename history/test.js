let path = require('path') // 内置
let HtmlWebpackPlugin = require('html-webpack-plugin')
let Optimize = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')
module.exports = {
    devServer: { // 开发服务器的设置
        hot: true,
    },
    devtool: 'cheap-module-eval-source-map',  
    optimization: { 
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new Optimize()
        ]
    },
    // },
    mode: 'development', // production || development
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.[hash:8].js', // 打包后的文件名, 哈希 且只显示8位
        path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径 , 
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
        new CopyWebpackPlugin([
            {
                from: 'doc', to: './'
            }
        ]),
        new webpack.BannerPlugin('----------thorn------'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            { 
                test: /\.less$/, 
                use: [
                    'css-loader', 
                    'postcss-loader',
                    'less-loader'
                ] 
            },
        ]
    }
}