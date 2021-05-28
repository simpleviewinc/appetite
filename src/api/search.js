const { getAll } = require('./getAll')
const { isStr, isObj } = require('@keg-hub/jsutils')
const { findBuild, findBuildByMetadata } = require('../utils/api')

/**
 * Returns the existing builds, if there are any, that match the note, platform, 
 * and metadata
 * @param {Object} options
 * @param {String} options.platform - ios/android
 * @param {String} options.note - note to search by
 * @param {String} options.meta - note fields to search by
 * @param {String} options.token - appetize dev token
 * @returns {Promise<Array<Object>>} a promise resolving to an array of builds matching the search params
 */
const search = async ({ platform, note, meta, token }) => {

  if (!isStr(note) && !isObj(meta))
    throw new Error('`note` string or `meta` object must be defined')
  if (!isStr(platform))
    throw new Error('Platform must be a string')

  const  { data: { data: allBuilds }} = await getAll({ token })

  return isObj(meta) && Object.keys(meta)
    ? findBuildByMetadata(
      allBuilds, 
      platform,
      meta
    )
    : note
      ? findBuild(allBuilds, { note, platform })
      : null
}

module.exports = {
  search
}