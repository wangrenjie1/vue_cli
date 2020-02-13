const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}`);
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

let webpackConfig = {
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname, './dist'),//输出结果
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    },
                    presets: ['es2015'],
                    plugins: ['transform-runtime', 'transform-object-rest-spread']
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'url-loader', options: { name: 'fonts/[name].[hash:8].[ext]' }//项目设置打包到dist下的fonts文件夹下
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // new CopyWebpackPlugin([{
        //     from: './src/static',
        //     to: 'static'
        // }]),
        new webpack.ProvidePlugin({
            "_global_object": [path.resolve(__dirname, "./src/static/js/event.js"), 'default']
        }),
        new HtmlWebpackPlugin(
            {
                filename: "./index.html",
                template: './src/index.html'
            }
        )
    ],
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            "@CoreUILib":path.resolve(__dirname,"./src/core/le-components"),

            // "@myCoreUILib": path.resolve(__dirname, "../../xw-vue-git/Core_UI_Lib"),
            // "@CoreUILib": path.resolve(__dirname, "../../xw-vue-git/admin/src/core/comps"),
            // "@CoreSrc": path.resolve(__dirname, "../../xw-vue-git/admin/src"),

            "@util": path.resolve(__dirname, "./src/core/tool/commonUtil.js"),
            "@service": path.resolve(__dirname, "./src/service"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@pages": path.resolve(__dirname, "./src/pages")
        }
    },
};
module.exports = merge(webpackConfig, _mergeConfig);