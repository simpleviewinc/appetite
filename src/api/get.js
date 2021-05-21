const api = require('../utils/api')
const { isStr } = require('@keg-hub/jsutils')

/**
 * @param {Object} options
 * @param {String} options.token - appetize dev token
 * @param {String} options.publicKey - appetize app public key identifier
 * @returns {Promise<Object>} a promise resolving to the response, including the app identified by publicKey
 */
const get = ({ token, publicKey }) => {
  if (!isStr(token))
    throw new Error('Token must be defined')
  if (!isStr(publicKey))
    throw new Error('publicKey must be defined')

  return api.get({ token, publicKey })
}

module.exports = {
  get
}