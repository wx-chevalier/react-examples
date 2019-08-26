const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '~skeleton': path.resolve(__dirname, '../..', 'src/skeleton/'),
      '~styles': path.resolve(__dirname, '../..', 'src/styles/')
    }
  }
};
