/// <binding ProjectOpened='Hot' />

var path = require("path");
var webpack = require("webpack");
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    devtool: "inline-source-map",
    entry: process.env.NODE_ENV == "development"?[
         "webpack-dev-server/client?http://localhost:3002",
         "webpack/hot/only-dev-server",
         "./sass/app.scss",
         "./app.tsx"
    ] : [
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
        loaders: [{
            test: /\.tsx?$/,
            loaders: ["react-hot", "ts-loader"],
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
            SERVER_URL: process.env.NODE_ENV === "development" ? JSON.stringify("http://localhost:30155") : JSON.stringify("")
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
        contentBase: "./wwwroot",
        host: "localhost",
        port: 3002,
        proxy: {
            '/api/*': {
                target: 'http://localhost:30155'
            },
            '/signin-*': {
                target: 'http://localhost:30155'
            },
            '/login': {
                target: 'http://localhost:30155'
            }
        },
        historyApiFallback:true
    }
};