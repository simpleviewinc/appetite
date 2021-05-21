const { find } = require('./find')
const { upload } = require('./upload')
const { update } = require('./update')

/**
 * Uploads the payload if no build exists with a matching note and platform,
 * otherwise updates the existing build
 * @param {Object} options 
 * @returns 
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