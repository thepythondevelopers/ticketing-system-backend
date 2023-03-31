const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
 
//when you want to make devlopment build remember to set enviroment variable to development using CLI command NODE_ENV='development'

module.exports = {
  entry: {
    main: './app.js'
  },
  output: {
    path: path.join(__dirname,'dev-build'),
    publicPath: '/',
    filename: '[name].js',
    clean: true
  },
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    })]
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ]
  }
}