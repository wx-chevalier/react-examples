const merge = require('webpack-merge');
const path = require('path');

const resolveConfig = require('./webpack.config.resolve');
const prodConfig = require('../../../../scripts/webpack/webpack.config.prod');

module.exports = merge(resolveConfig, prodConfig, {
  entry: {
    index: path.resolve(__dirname, '../../src/index')
  }
});
