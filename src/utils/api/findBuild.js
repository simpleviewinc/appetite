const { identity, isObj } = require('@keg-hub/jsutils')

/**
 * Finds the build matching expected fields
 * @param {Array<Object>} builds 
 * @param {Object} expectedFields - object with search fields 
 * @param {Object<Function>} parsers - optional parsers for build field
 * @returns 
 */
const findBuild = (builds, expectedFields={}, parsers={}) => 
  builds.filter(build => {
    return Object.entries(expectedFields).every(
      ([key, value]) => {
        const parser = parsers[key] || identity
        return parser(build[key]) === value
      }
    )
  })

/**
 * @param {*} note 
 * @param {string} key 
 * @returns {*} if note was encoded an object, then this returns
 * the value mapped to `key`. If it is not an object, this returns
 * just the note unchanged.
 */
const tryParse = (note, key) => {
  try {
    const parsed = JSON.parse(note)
    if (!isObj(parsed)) return note
    return parsed[key]
  }
  catch (err) {
    return note
  }
}

/**
 * Finds the build by checking its note value, parsing it as
 * a JSON object and checking if the value matches for the noteKey
 * @param {Array<Object>} builds
 * @param {String} options.platform - ios/android
 * @param {Object} options.expectedFields - fields expected in the note object
 * @returns {Array<Object>} - matching builds
 */
const findBuildByMetadata = (builds, platform, expectedFields={}) => {
  return builds.filter(build => {
    if (build.platform !== platform) return false
    return Object.entries(expectedFields).every(
      ([key, value]) => tryParse(build.note, key) === value
    )
  })
}

module.exports = { findBuild, findBuildByMetadata }