const { buildUri } = require('../buildUri')

describe('buildUri', () => {

  const token = '1234'
  const version = '1'
  const endpoint = 'apps'
  const publicKey = 'abc'

  const getExpectedURLPattern = key => new RegExp(
    `https:\/\/${token}.*\/v${version}\/${endpoint}${key ? `\/${key}` : ''}`
  )

  it('should build the uri depending on the components', () => {
    expect(buildUri(
      token, version, endpoint, publicKey
    )).toEqual(
      expect.stringMatching(getExpectedURLPattern(publicKey))
    )

    expect(buildUri(
      token, version, endpoint 
    )).toEqual(
      expect.stringMatching(getExpectedURLPattern(null))
    )
  })
})