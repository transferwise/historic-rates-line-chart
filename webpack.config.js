const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const filename = 'historic-rates-line-chart';

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: `${filename}.js`,
    library: '@transferwise/historic-rates-line-chart',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  optimization: {
      minimizer: [
          new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true,
          }),
      ],
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
              },
          },
          // {
          //     test: /\.less$/,
          //     exclude: /node_modules/,
          //     use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
          // },
          // {
          //     test: /fonts.*\.(woff|woff2|svg|eot|ttf)/,
          //     use: ['file-loader'],
          // },
      ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
      umd: 'prop-types',
    },
  },
};
