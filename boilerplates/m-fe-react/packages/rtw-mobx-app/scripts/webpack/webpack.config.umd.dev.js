const path = require('path');
const merge = require('webpack-merge');

const { devConfig } = require('../../../../scripts/webpack/webpack.config');

module.exports = merge(devConfig, {
  devServer: {
    contentBase: path.resolve(__dirname, '../../public')
  },
  output: {
    libraryTarget: 'umd'
  }
});
