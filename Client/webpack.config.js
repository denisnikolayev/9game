/// <binding ProjectOpened='Hot' />

var path = require("path");
var webpack = require("webpack");
var WebpackNotifierPlugin = require('webpack-notifier');

var proxyServerUrl = process.env.NODE_ENV === "development" ? "http://localhost:30155"
    : process.env.NODE_ENV === "developmentWithoutServer" ? "http://9game.azurewebsites.net"
    : "";

console.log(process.env.NODE_ENV);
console.log("Proxy server url " + proxyServerUrl);

module.exports = {
    devtool: process.env.NODE_ENV == "development" || process.env.NODE_ENV === "developmentWithoutServer" ? "inline-source-map" : "",
    entry: process.env.NODE_ENV == "development" || process.env.NODE_ENV === "developmentWithoutServer"
        ? [
            "webpack-dev-server/client?http://localhost:3002",
            "webpack/hot/only-dev-server",
            "./sass/app.scss",
            "./app.tsx"
        ]
        : [
            "./sass/app.scss",
            "./app.tsx"
        ],
    output: {
        path: path.join(__dirname, "../Server/wwwroot"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".tsx", ".js", "", ".ts", '.scss', '.png', '.jpg']
    },
    module: {
        loaders: [
        {
            test: /(\.tsx|\.ts)$/,
            loaders: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "developmentWithoutServer" ? ["react-hot", "babel-loader?presets[]=es2015&plugins[]=transform-runtime&presets[]=stage-0", "ts-loader"] : ["babel-loader?presets[]=es2015&plugins[]=transform-runtime&presets[]=stage-0", "ts-loader"],
            include: __dirname
        },
        { test: /\.png|\.jpg$/, loader: "url-loader?limit=100000" },
        {
            test: /\.scss$/,
            exclude: /node_modules|lib/,
            loader: 'style!css!sass',
            include: __dirname
        }]
    },
    plugins: [        
        new webpack.DefinePlugin({
            SERVER_URL: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "developmentWithoutServer" ? JSON.stringify(proxyServerUrl) : JSON.stringify("")
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new WebpackNotifierPlugin()
    ],
    debug: false,
    devServer: {
        contentBase: "../server/wwwroot",
        hot: true,
        host: "localhost",
        port: 3002,
        inline:true,
        proxy: {
            '/api/*': {
                target: proxyServerUrl
            },
            '/signin-*': {
                target: proxyServerUrl
            },
            '/login': {
                target: proxyServerUrl
            }
        },
        historyApiFallback:true
    }
};