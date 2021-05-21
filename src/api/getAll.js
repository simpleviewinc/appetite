const api = require('../utils/api')
const { isStr } = require('@keg-hub/jsutils')

/**
 * Gets a list of all app builds from the api
 * @param {Object} options
 * @param {String} options.token - appetize token
 * @returns {Promise<Object>} the response, including a list of all apps on appetize
 */
const getAll = ({ token }) => {
  if (!isStr(token)) throw new Error('token must be defined')
  return api.get({ token })
}

module.exports = {
  getAll
}