const api = require('../utils/api')
const { isStr } = require('@keg-hub/jsutils')

/**
 * Deletes an app identified by publicKey
 * @param {Object} options
 * @param {String} options.token - appetize dev token
 * @param {String} options.publicKey - appetize app public key identifier
 * @returns {Promise<Object>} a promise resolving to the api response
 */
const remove = ({ token, publicKey }) => {
  if (!isStr(token))
    throw new Error('Token must be defined')
  if (!isStr(publicKey))
    throw new Error('publicKey must be defined')

  return api.delete({ token, publicKey })
}

module.exports = {
  remove
}