let path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        react: './src/react.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'abc',
        libraryTarget: 'commonjs'
    }
}