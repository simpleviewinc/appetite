const axios = require('axios')
const { buildUri } = require('./buildUri')

/**
 * Sends a get request to the Appetize api.
 * @param {Object} options
 * @returns 
 */
 const get = async (options={}) => {
  const { 
    token, 
    version='1', 
    endpoint='apps/', 
    params={}, 
    publicKey 
  } = options

  const uri = buildUri(token, version, endpoint, publicKey)

  try {
    return await axios.get(uri, { params })
  }
  catch (err) {
    console.error(err)
  }
}

module.exports = { get }