const { externals } = require('rtw-core');
const path = require('path');
const merge = require('webpack-merge');

const resolveConfig = require('./webpack.config.resolve');
const devConfig = require('../../../../scripts/webpack/webpack.config.dev');

module.exports = merge(resolveConfig, devConfig, {
  entry: {
    index: path.resolve(__dirname, '../../src/index.umd')
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../public'),
    port: 8081
  },
  externals,
  output: {
    libraryTarget: 'umd'
  }
});
