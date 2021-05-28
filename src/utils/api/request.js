const axios = require('axios')
const { buildUri } = require('./buildUri')

/**
 * Sends a request to the Appetize api.
 * @param {Object} options
 * @returns 
 */
 const request = async (options={}) => {
  const { 
    method='get',
    token, 
    requestConfig, 
    version='1', 
    data, 
    endpoint='apps/', 
    publicKey 
  } = options

  const url = buildUri(token, version, endpoint, publicKey)

  return await axios({
    method,
    url, 
    data, 
    ...requestConfig
  })
}

module.exports = {
  request,
  post: (options={}) => request({ method: 'post', ...options }),
  get: (options={}) => request({ method: 'get', ...options }),
  delete: (options={}) => request({ method: 'delete', ...options })
}