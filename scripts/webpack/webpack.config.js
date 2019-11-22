module.exports = require('@wx-fc/webpack-config')({
  extendedBaseConfig: {
    resolve: {
      alias: {
        dayjs: 'dayjs/esm',
        moment$: 'dayjs/esm',
        systemjs$: 'systemjs/dist/system.js',
      },
    },
  },
});
