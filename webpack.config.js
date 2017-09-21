let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ['whatwg-fetch',"./src/main.js"],  //whatwg-fetch  解决fetch的兼容性问题
    output: {
        filename: "bundle.js",
        path: path.resolve('./dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.(png|gif|jpeg|jpg)$/, use: 'url-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}