const path = require('path')
const axios = require('axios')

const buildEndpoint = (token, version, endpoint) => 
  `https://${token}@api.appetize.io/v${version}/${endpoint}`

/**
 * Sends a post request to the Appetize api.
 * @param {Object} options
 * @returns 
 */
 const post = async ({ token, requestConfig, version='1', data, endpoint='apps/', publicKey }) => {
  const apiEndpoint = publicKey
    ? path.join(endpoint, publicKey)
    : endpoint 

  const uri = buildEndpoint(token, apiEndpoint, version)

  try {
    return await axios.post(uri, data, requestConfig)
  }
  catch (err) {
    console.error(err)
  }
}

module.exports = {
  post,
  buildEndpoint
}