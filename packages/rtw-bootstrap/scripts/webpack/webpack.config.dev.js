const path = require('path');
const merge = require('webpack-merge');

const resolveConfig = require('./webpack.config.resolve');
const baseConfig = require('../../../../scripts/webpack/webpack.config.dev');

module.exports = merge(baseConfig, resolveConfig, {
  devServer: {
    contentBase: path.resolve(__dirname, '../../public')
  }
});
