const baseConfig = require('@wx-fc/webpack-config')({
  target: 'mobile',
  themeVars: { 'brand-primary': '#6874e2' },
  extendedBaseConfig: {
    output: { filename: '[name].js' },
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

module.exports = baseConfig;
