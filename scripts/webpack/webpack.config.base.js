const merge = require('webpack-merge');

process.env.buildEnv = { cacheId: 'rtw' };

const baseConfig = { ...require('@wx-fc/webpack-config/webpack.config.base') };

delete baseConfig.extra;

module.exports = merge(baseConfig, {
  resolve: {
    alias: {
      dayjs: 'dayjs/esm',
      moment$: 'dayjs/esm',
      systemjs$: 'systemjs/dist/system.js',
    },
  },
});
