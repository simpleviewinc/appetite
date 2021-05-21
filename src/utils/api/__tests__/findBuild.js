const { findBuild, findBuildByNoteFields } = require('../')
const { mockBuilds } = require('../__mocks__/builds')

describe('findBuild', () => {
  it('should find the match', () => {
    const build = findBuild(
      mockBuilds, 
      {
        note: mockBuilds[1].note,
        platform: 'ios'
      }
    )
    expect(build).toEqual(mockBuilds[1])
  })
})

describe('findBuildByNoteFields', () => {
  it('should find the match by key', () => {
    const build = findBuildByNoteFields(
      mockBuilds,
      'ios',
      { 
        branch: 'my-branch'
      }
    )
    expect(build).toEqual(mockBuilds[0])
  })
})

module.exports = { mockBuilds }