const path = require('path');
const merge = require('webpack-merge');

const devConfig = require('../../../../scripts/webpack/webpack.config.dev');

const config = merge(devConfig, {
  entry: {
    index: path.resolve(__dirname, '../../src/index')
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../public')
  }
});

module.exports = config;
