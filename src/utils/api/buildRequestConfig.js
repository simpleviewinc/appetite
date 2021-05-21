/**
 * builds the request config object to be used with axios 
 * @param {FormData} form 
 * @param {string} token 
 * @returns 
 */
const buildRequestConfig = form => ({
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: form ? form.getHeaders() : {},
})

module.exports = { buildRequestConfig }