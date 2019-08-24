const path = require('path');
const { externals } = require('rtw-core');

const baseConfig = require('../../../../scripts/webpack/webpack.config.dev');

module.exports = {
  ...baseConfig,
  devServer: {
    ...baseConfig.devServer,
    contentBase: path.resolve(__dirname, '../../public')
  },
  externals
};
