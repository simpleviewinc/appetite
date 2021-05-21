const { find } = require('./find')
const { upload } = require('./upload')
const { update } = require('./update')

/**
 * Uploads the payload if no build exists with a matching note and platform,
 * otherwise updates the existing build
 * @param {Object} options
 * @param {String} options.filePath - path to zipped simulator build
 * @param {String} options.url - url to hosted simulator build
 * @param {String} options.token - appetize dev token
 * @param {String} options.platform - ios/android
 * @param {String} options.note - note to search by, and to include in upload/update
 * @param {String} options.noteFields - note fields to search by, and to include in upload/update
 * @param {...&} options.rest - any other fields to include in the post form
 * @returns {Promise<Object>} the result of uploading the file to the appetize api
 */
const upsert = async (options={}) => {
  const { 
    token, 
    note,
    noteFields,
    platform,
  } = options

  const foundBuild = await find({ platform, token, note, noteFields })

  return foundBuild
    ? update({ ...options, publicKey: foundBuild.publicKey })
    : upload(options)
}

module.exports = { upsert }