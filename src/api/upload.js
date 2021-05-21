const api = require('../utils/api')
const { isStr } = require('@keg-hub/jsutils')

/**
 * @param {Object} options
 * @param {String} options.filePath - path to zipped simulator build
 * @returns {Promise<Object>} the result of uploading the file to the appetize api
 */
const upload = ({ filePath, platform, token, url }) => {
  if (!isStr(filePath) && !isStr(url))
    throw new Error('Either filePath or url must be defined')
  if (!isStr(platform))
    throw new Error('platform must be defined')
  if (!isStr(token))
    throw new Error('token must be defined')

  const { data, requestConfig } = api.buildRequestPayload(
    { filePath, url, token }, 
    { platform }
  )

  return api.post({
    token,
    data,
    requestConfig,
  })
}

module.exports = {
  upload
}