const merge = require('webpack-merge');

module.exports = merge(
  require('./webpack.config.base'),
  require('@wx-fc/webpack-config/webpack.config.dev'),
  {},
);
