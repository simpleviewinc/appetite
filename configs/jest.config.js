const path = require('path');

require('dotenv').config()

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  testMatch: [ '<rootDir>/**/__tests__/**/*.js']
}