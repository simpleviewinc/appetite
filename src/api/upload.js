const http = require('ATUtils/http')

/**
 * @param {Object} options
 * @param {String} options.filePath - path to zipped simulator build
 * @returns {Promise<Object>} the result of uploading the file to the appetize api
 */
const upload = ({ filePath, platform, token, url }) => {
  return http.post({
    token,
    platform,
    filePath,
    url
  })
}

module.exports = {
  upload
}