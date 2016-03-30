// Run this command in cmd
// node startWithoutServer.js

var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

process.env.NODE_ENV = "developmentWithoutServer";

var config = require("./webpack.config.js");
config.plugins.push(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, config.devServer);
server.listen(config.devServer.port, config.devServer.host, function (err) {
	if (err) {
		console.log(err);
	}
	console.log('Listening at localhost:3002');	
});