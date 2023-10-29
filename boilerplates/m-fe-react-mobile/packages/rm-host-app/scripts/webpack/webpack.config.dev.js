const path = require('path');
const merge = require('webpack-merge');

const { devConfig } = require('../../../../scripts/webpack/webpack.config');

const config = merge(devConfig, {
  entry: {
    index: [
      'react-hot-loader/patch',
      path.resolve(__dirname, '../../src/index'),
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../public'),
  },
});

module.exports = config;
