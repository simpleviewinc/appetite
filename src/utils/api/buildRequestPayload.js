const fs = require('fs')
const FormData = require('form-data')
const { buildRequestConfig } = require('./buildRequestConfig')

/**
 * Builds a form object
 * @param {Object} data - keys and values to append to the FormData
 * @returns {FormData} form
 */
const buildForm = (data={}) => {
  return Object
    .entries(data)
    .reduce((form, [ key, value ]) => {
      form.append(key, value)
      return form
    }, new FormData())
}

/**
 * Get the api request payload for a filePath upload/update
 * @param {Object} options
 * @param {string} options.filePath
 * @param {string} options.token
 * @param {Object} extra 
 * @returns {Object} - { data, requestConfig }
 */
 const buildRequestPayload = ({ filePath, url, token }, extra) => {
  const form = buildForm({ 
    ...(filePath && { file: fs.createReadStream(filePath) }),
    ...(url && { url }),
    ...extra
  })

  return {
    data: form,
    requestConfig: buildRequestConfig(form, token) 
  }
}

module.exports = { buildRequestPayload }