const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const prodCssConfig = ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: [
    { loader: 'css-loader' },
    { loader: 'postcss-loader' },
  ],
  publicPath: '/',
});
const devCssConfig = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    query: {
      sourceMap: true,
    },
  },
  { loader: 'postcss-loader' },
];

const wpconfig = {
  entry: {
    main: [
      './src/index.js',
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: 'babel-loader',
      },
      {
        test: /.json$/,
        use: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: isProd ? prodCssConfig : devCssConfig,
      },
      {
        test: /\.woff(2)?(\?[a-z0-9=]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 64000,
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9=]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: !isProd,
    }),
  ],
  devServer: {
    hot: !isProd,
    publicPath: '/',
    historyApiFallback: true,
  },
  performance: {
    hints: false,
  },
};

if (!isProd) {
  wpconfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    ...wpconfig.plugins,
  ];
} else {
  wpconfig.plugins = [
    new ExtractTextPlugin('[name].css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
