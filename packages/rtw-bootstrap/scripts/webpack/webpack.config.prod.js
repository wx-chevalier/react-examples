const merge = require('webpack-merge');

const resolveConfig = require('./webpack.config.resolve');
const prodConfig = require('../../../../scripts/webpack/webpack.config')
  .prodConfig;

module.exports = merge(resolveConfig, prodConfig);
