const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'skeleton/*': path.resolve(__dirname, '../../src', 'skeleton')
    }
  }
};
