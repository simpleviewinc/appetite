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

  try {
    return await axios({
      method,
      url, 
      data, 
      ...requestConfig
    })
  }
  catch (err) {
    console.error(err)
    return null
  }
}

const post = (options={}) => request({ method: 'post', ...options })
const get = (options={}) => request({ method: 'get', ...options })

module.exports = {
  request,
  post,
  get
}