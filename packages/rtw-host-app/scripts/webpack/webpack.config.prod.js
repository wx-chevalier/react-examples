const merge = require('webpack-merge');
const path = require('path');

const prodConfig = require('../../../../scripts/webpack/webpack.config.prod');

module.exports = merge(prodConfig, {
  entry: {
    index: path.resolve(__dirname, '../../src/index')
  }
});
