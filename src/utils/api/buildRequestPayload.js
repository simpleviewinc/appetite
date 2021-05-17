const fs = require('fs')
const FormData = require('form-data')

/**
 * builds the request config object to be used with axios 
 * @param {FormData} form 
 * @param {string} token 
 * @returns 
 */
const buildRequestConfig = (form, token) => ({
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: ({
    ...form.getHeaders(),
    ...(token && { Authorization: `Bearer ${token}`})
  })
})

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
 * Get the api request payload for a filePath upload
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