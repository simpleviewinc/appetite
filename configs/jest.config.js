const path = require('path');

require('dotenv').config()

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  testMatch: process.env.E2E
    ? [ '<rootDir>/**/__e2e__/**/*.js']
    : [ '<rootDir>/**/__tests__/**/*.js'],
  moduleNameMapper: {
    '^ATRoot$': '<rootDir>$1',
    '^ATUtils$': '<rootDir>/src/utils$1',
    '^ATApi$': '<rootDir>/src/api'
  }
}