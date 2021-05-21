const api = require('../utils/api')

/**
 * @param {Object} options
 * @param {String} options.filePath - path to zipped simulator build
 * @returns {Promise<Object>} the result of uploading the file to the appetize api
 */
const getAll = ({ token }) => api.get({ token, endpoint: 'apps' })

module.exports = {
  getAll
}