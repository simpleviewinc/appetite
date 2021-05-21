const api = require('../utils/api')
const { isStr } = require('@keg-hub/jsutils')

/**
 * @param {Object} options
 * @param {String} options.token - appetize token
 * @returns {Promise<Object>} the response, including a list of all apps on appetize
 */
const getAll = ({ token }) => {
  if (!isStr(token)) throw new Error('token must be defined')
  api.get({ token })
}

module.exports = {
  getAll
}