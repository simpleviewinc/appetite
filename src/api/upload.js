const api = require('../utils/api')
const { isStr } = require('@keg-hub/jsutils')
const { buildForm } = require('../utils/form')
const fs = require('fs')

/**
 * @param {Object} options
 * @param {String} options.filePath - path to zipped simulator build
 * @param {String} options.url - url to hosted simulator build
 * @param {String} options.token - appetize dev token
 * @param {String} options.platform - ios/android
 * @param {...&} options.rest - any other fields to include in the post form
 * @returns {Promise<Object>} the result of uploading the file to the appetize api
 */
const upload = (options={}) => {
  const { filePath, platform, token, url, ...params } = options

  if (!isStr(filePath) && !isStr(url))
    throw new Error('Either filePath or url must be defined')
  if (!isStr(platform))
    throw new Error('platform must be defined')
  if (!isStr(token))
    throw new Error('token must be defined')

  const data = buildForm({ 
    ...(filePath && { file: fs.createReadStream(filePath) }),
    url,
    platform,
    ...params
  })

  const requestConfig = api.buildRequestConfig(data, token)

  return api.post({
    token,
    data,
    requestConfig,
  })
}

module.exports = {
  upload
}