const path = require('path');
const merge = require('webpack-merge');

const resolveConfig = require('./webpack.config.resolve');
const devConfig = require('../../../../scripts/webpack/webpack.config.dev');

const config = merge(resolveConfig, devConfig, {
  entry: {
    index: path.resolve(__dirname, '../../src/index')
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../public')
  }
});

module.exports = config;
