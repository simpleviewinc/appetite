const FormData = require('form-data')
const { isStr } = require('@keg-hub/jsutils')

/**
 * @param {Object} data 
 * @returns {Object} new object with data's entries, but serializing any entries
 * that need it (currently only data.meta)
 */
const serializeEntries = data => {
  const note = data.note
    ? data.note
    : data.meta
      ? JSON.stringify(data.meta)
      : null
  
  return {
    ...data,
    ...(note && { note })
  }
}

/**
 * Builds a form object
 * @param {Object} data - keys and values to append to the FormData
 * @returns {FormData} form
 */
const buildForm = (data={}) => {
  const serialized = serializeEntries(data)

  return Object
    .entries(serialized)
    .reduce((form, [ key, value ]) => {
      isStr(value) && form.append(key, value)
      return form
    }, new FormData())
}

module.exports = { buildForm }