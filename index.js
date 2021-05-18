require('module-alias/register')
require('dotenv').config()

module.exports = {
  ...require('./src')
}
