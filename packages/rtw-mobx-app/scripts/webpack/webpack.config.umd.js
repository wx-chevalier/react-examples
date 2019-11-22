const merge = require('webpack-merge');

const umdConfig = require('../../../../scripts/webpack/webpack.config').umdConfig;

module.exports = merge(umdConfig, {});
