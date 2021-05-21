const FormData = require('form-data')
const { exists } = require('@keg-hub/jsutils')

/**
 * Builds a form object
 * @param {Object} data - keys and values to append to the FormData
 * @returns {FormData} form
 */
const buildForm = (data={}) => {
  return Object
    .entries(data)
    .reduce((form, [ key, value ]) => {
      exists(value) && form.append(key, value)
      return form
    }, new FormData())
}

module.exports = { buildForm }