const { externals } = require('@wx/rtw-core');
const path = require('path');
const merge = require('webpack-merge');

const devConfig = require('../../../../scripts/webpack/webpack.config.dev');

module.exports = merge(devConfig, {
  devServer: {
    contentBase: path.resolve(__dirname, '../../public'),
    port: 8081
  },
  externals,
  output: {
    libraryTarget: 'umd'
  }
});
