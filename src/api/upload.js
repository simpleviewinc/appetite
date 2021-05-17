const api = require('../utils/api')

/**
 * @param {Object} options
 * @param {String} options.filePath - path to zipped simulator build
 * @returns {Promise<Object>} the result of uploading the file to the appetize api
 */
const upload = ({ filePath, platform, token, url }) => {
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