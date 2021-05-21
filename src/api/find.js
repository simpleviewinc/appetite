const { getAll } = require('./getAll')
const { isStr, isObj } = require('@keg-hub/jsutils')
const { findBuild, findBuildByNoteFields } = require('../utils/api')

/**
 * Returns the existing build, if there is one, that matches the note,
 * or the noteFields (if note is a map), and matches the platform
 * @param {Object} options
 * @param {String} options.token - appetize dev token
 * @param {String} options.publicKey - appetize app public key identifier
 * @returns {Promise<Object?>} a promise resolving to the response, including the app identified by publicKey
 */
const find = async ({ platform, note, noteFields, token }) => {
  if (!isStr(note) && !isObj(noteFields))
    throw new Error('Note or branch must be defined')
  if (!isStr(platform))
    throw new Error('Platform must be defined')

  const  { data: { data: allBuilds }} = await getAll({ token })

  return noteFields && Object.keys(noteFields)
    ? findBuildByNoteFields(
      allBuilds, 
      platform,
      noteFields, 
    )
    : note
      ? findBuild(allBuilds, { note, platform })
      : null
}

module.exports = {
  find
}