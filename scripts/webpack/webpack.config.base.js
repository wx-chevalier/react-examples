const merge = require('webpack-merge');
const baseConfig = { ...require('@wx-fc/webpack-config/webpack.config.base') };

process.env.buildEnv = { cacheId: 'rtw' };

delete baseConfig.extra;

module.exports = merge(baseConfig, {});
