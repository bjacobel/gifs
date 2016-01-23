const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV;

const wpconfig = {
  entry: {
    main: [
      './src/index.js'
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  debug: true,
  devtool: isProd ? null : 'eval',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.(eot|ttf|woff|svg)(\?[a-z0-9=]+)?$/,
        loader: 'file-loader'
      },
      {
        test: /packery/,
        loader: 'imports?define=>false&this=>window'
      }
    ],
    noParse: [
      /aws\-sdk/
    ]
  },
  sassLoaderConfig: {
    sourceComments: !isProd,
    outputStyle: 'expanded',
    sourceMap: false
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.scss']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin(`[name].css`)
  ]
};

if (!isProd) {
  wpconfig.entry.main = ['webpack/hot/dev-server', ...wpconfig.entry.main];
}

module.exports = wpconfig;
