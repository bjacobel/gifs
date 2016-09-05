const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssImport = require('postcss-import');
const postcssFontMagician = require('postcss-font-magician');
const stylelint = require('stylelint');
const DashboardPlugin = require('webpack-dashboard/plugin');

const isProd = process.env.NODE_ENV === 'production';

const wpconfig = {
  entry: {
    main: [
      './src/index.js'
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js'
  },
  debug: true,
  devtool: isProd ? null : 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.(eot|ttf|woff|svg)(\?[a-z0-9=]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  postcss(wp) {
    return [
      stylelint,
      postcssImport({
        addDependencyTo: wp
      }),
      precss,
      postcssFontMagician,
      autoprefixer({ browsers: ['last 2 versions'] })
    ];
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new DashboardPlugin()
  ]
};

if (!isProd) {
  wpconfig.entry.main = ['webpack/hot/dev-server', ...wpconfig.entry.main];
}

module.exports = wpconfig;
