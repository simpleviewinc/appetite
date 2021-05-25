const path = require('path')

/**
 * Builds the Appetize url from the input
 * @param {string} token - appetize dev token
 * @param {number | string} version - api version
 * @param {string} endpoint - the endpoint of the api (e.g. "apps")
 * @returns {string} - the build endpoint
 */
const buildUri = (token, version, endpoint, publicKey) => {
  const apiEndpoint = publicKey
    ? path.join(endpoint, publicKey)
    : endpoint 

  return `https://${token}@api.appetize.io/v${version}/${apiEndpoint}`
}

module.exports = { buildUri }