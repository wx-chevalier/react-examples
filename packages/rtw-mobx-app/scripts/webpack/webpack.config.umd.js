const merge = require('webpack-merge');

const umdConfig = require('../../../../scripts/webpack/webpack.config.umd');

module.exports = merge(umdConfig, {});
