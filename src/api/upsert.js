const { search } = require('./search')
const { upload } = require('./upload')
const { update } = require('./update')
const { isObj } = require('@keg-hub/jsutils')

/**
 * Uploads the payload if no build exists with a matching search parameters,
 * otherwise updates the existing build
 * @param {Object} options
 * @param {String} options.token - appetize dev token
 * @param {String} options.payload - values to use during the upload or update
 * @param {String} options.payload.filePath - path to zipped simulator build
 * @param {String} options.payload.url - url to hosted simulator build
 * @param {String} options.payload.platform - ios/android
 * @param {Object?} options.payload.metadata - (optional) upsert will compare the entries in this object against the json-parsed "note" string of existing builds
 * @param {...&} options.payload.* - any other fields to include in the upload/update
 * @param {SearchParams} options.search - values to use when searching for an existing build
 * @param {String?} options.search.platform - platform to search by
 * @param {String?} options.search.note - note to search by
 * @param {Object?} options.search.metadata - note fields to search by
 * @returns {Promise<Object>} the result of uploading or updating the file with the appetize api
 */
const upsert = async (options={}) => {
  const { 
    token, 
    payload,
  } = options

  if (!isObj(options.search))
    throw new Error('"search" must be an object with your search params')
  if (!isObj(payload))
    throw new Error('"payload" must be an object with your upload / update data')

  const [ foundBuild, ...rest ] = await search({ token, ...options.search })

  if (rest.length)
    throw new Error(`
      Multiple builds match your search parameters, so "upsert" cannot infer what to do. 
      Either use more specific parameters, or directly call "update" or "upload".
    `)

  return foundBuild
    ? update({ ...payload, token, publicKey: foundBuild.publicKey })
    : upload({ ...payload, token })
}

module.exports = { upsert }