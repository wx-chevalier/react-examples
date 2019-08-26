const path = require('path');

module.exports = {
  resolve: {
    alias: {
      systemjs: path.resolve(__dirname, '../..', 'src/system.min.js')
    }
  }
};
