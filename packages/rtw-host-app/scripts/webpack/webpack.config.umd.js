const { externals } = require('rtw-core');
const merge = require('webpack-merge');

const resolveConfig = require('./webpack.config.resolve');
const umdConfig = require('../../../../scripts/webpack/webpack.config.umd');

module.exports = merge(resolveConfig, umdConfig, {
  entry: {
    index: path.resolve(__dirname, '../../src/index.umd')
  },
  externals
});
