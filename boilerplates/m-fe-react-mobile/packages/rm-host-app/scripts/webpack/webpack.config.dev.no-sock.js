const path = require('path');
const merge = require('webpack-merge');

const { prodConfig } = require('../../../../scripts/webpack/webpack.config');

delete prodConfig.optimize;

const config = merge(prodConfig, {
  output: { filename: '[name].js' },
  entry: {
    index: [path.resolve(__dirname, '../../src/index')],
  },
  watch: true,
  resolve: { alias: { 'react-dom': 'react-dom' } },
});

module.exports = config;
