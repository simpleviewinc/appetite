const { getAll } = require('./getAll')
const { upload } = require('./upload')
const { update } = require('./update')
const { findBuild, findBuildByNoteFields } = require('../utils/api')

const upsert = async (options={}) => {
  const { 
    token, 
    note,
    noteFields,
    platform,
  } = options

  const { data: allBuilds } = await getAll({ token })

  const foundBuild = noteFields
    ? findBuildByNoteFields(
      allBuilds, 
      platform,
      noteFields, 
    )
    : note
      ? findBuild(allBuilds, { note, platform })
      : null

  return foundBuild
    ? update({ ...options, publicKey: foundBuild.publicKey })
    : upload(options)
}

module.exports = { upsert }