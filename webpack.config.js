var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/dist/",
    filename: "bundle.js"
  }, 
  module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['react','es2015']
                }
                }, {  
                      test: /\.less$/,
                      loader: 'style-loader!css-loader!less-loader'
                      /*loader: ExtractTextPlugin.extract(
                        'css?sourceMap!' +
                        'less?sourceMap'
                      )*/
               },
              {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            }
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
    devServer: {
        hot: true,
        inline: true
    },
    //plugins: []
    plugins:[
       new ExtractTextPlugin('styles.css'),
       new HtmlWebpackPlugin({ 
        filename: 'index.html',
        template: 'index.html'
      })
    ]
};