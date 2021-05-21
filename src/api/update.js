const api = require('../utils/api')
const { isStr } = require('@keg-hub/jsutils')
const { buildForm } = require('../utils/form')

/**
 * @param {Object} options
 * @param {String} options.filePath - path to zipped simulator build
 * @returns {Promise<Object>} the result of uploading the file to the appetize api
 */
const update = (options={}) => {
  const { 
    token, 
    publicKey, 
    filePath, 
    url, 
    ...params 
  } = options

  if (!isStr(filePath) && !isStr(url))
    throw new Error('Either filePath or url must be defined')
  if (!isStr(publicKey))
    throw new Error('publicKey must be defined')
  if (!isStr(token))
    throw new Error('token must be defined')

  const data = buildForm({ filePath, url, ...params })

  const requestConfig = api.buildRequestConfig(data, token)

  return api.post({
    token,
    data,
    requestConfig,
    publicKey
  })
}

module.exports = {
  update
}