const { getAll } = require('./getAll')
const { isStr, isObj } = require('@keg-hub/jsutils')
const { findBuild, findBuildByMetadata } = require('../utils/api')

/**
 * Returns the existing builds, if there are any, that match the note, platform, 
 * and metadata
 * @param {Object} options
 * @param {String} options.platform - ios/android
 * @param {String} options.note - note to search by
 * @param {String} options.metadata - note fields to search by
 * @param {String} options.token - appetize dev token
 * @returns {Promise<Array<Object>>} a promise resolving to an array of builds matching the search params
 */
const search = async ({ platform, note, metadata, token }) => {

  if (!isStr(note) && !isObj(metadata))
    throw new Error('Note string or metadata object must be defined')
  if (!isStr(platform))
    throw new Error('Platform must be defined')

  const  { data: { data: allBuilds }} = await getAll({ token })

  return isObj(metadata) && Object.keys(metadata)
    ? findBuildByMetadata(
      allBuilds, 
      platform,
      metadata, 
    )
    : note
      ? findBuild(allBuilds, { note, platform })
      : null
}

module.exports = {
  search
}