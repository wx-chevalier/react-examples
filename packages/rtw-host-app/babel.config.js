module.exports = {
  presets: [
    [
      '@wx-fc',
      {
        import: true,
        react: true,
        typescript: true,
      },
    ],
  ],
  plugins: [['import', { libraryName: 'antd-mobile', style: true }]],
};
