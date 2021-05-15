require('module-alias/register')
require('dotenv').config()

module.exports = {
  ...require('./src')
}

if (require.main === module) {
  const { runTest } = require('./src/example/test.js')
  runTest()
}

