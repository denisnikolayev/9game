var webpack = require("webpack");
var path = require("path");

var config = {
    entry: [         
        "./scripts/tests.ts"
    ],
    output: {
        path: __dirname,
        filename: "tests.js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".tsx", ".js", ".ts", ""]
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loaders: ["ts-loader?configFileName='tsconfig.fortest.json'"],
            include: path.join(__dirname, "scripts")
        }]
    }
};


webpack(config, function(err, stats) {        
        console.log(stats.toString({
            // output options
        }));
        require("./tests.js");
});