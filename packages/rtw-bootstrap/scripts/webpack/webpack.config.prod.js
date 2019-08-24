const { externals } = require('rtw-core');
const prodConfig = require('../../../../scripts/webpack/webpack.config.prod');

module.exports = {
  ...prodConfig,
  externals
};
