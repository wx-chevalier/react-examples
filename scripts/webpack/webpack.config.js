module.exports = require('@wx-fc/webpack-config')({
  extendedBaseConfig: {
    module: {
      rules: [
        // svg 的加载交于应用自身决定
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          oneOf: [
            {
              issuer: /\.[jt]sx?$/,
              use: [
                {
                  loader: '@svgr/webpack',
                  // loader: 'svg-inline-loader',
                },
              ],
            },
            {
              loader: 'url-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        dayjs: 'dayjs/esm',
        moment$: 'dayjs/esm',
        systemjs$: 'systemjs/dist/system.js',
      },
    },
  },
});
