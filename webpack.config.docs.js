const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackTranslationsPlugin = require('webpack-translations-plugin');

const devConfig = require('./webpack.config.dev');

module.exports = {
  mode: 'production',
  entry: devConfig.entry,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'historic-rates-line-chart.js',
  },
  module: devConfig.module,
  plugins: [
    new HtmlWebpackPlugin({
      template: './docs/index.html',
    }),
    new WebpackTranslationsPlugin(),
  ],
  resolve: devConfig.resolve,
};
