const { post } = require('..')
const { isValidUrl } = require('@keg-hub/jsutils')
const axios = require('axios')

describe('post', () => {
  const options = {
    token: '123',
    requestConfig: { headers: [] },
    version: '399',
    data: 'hello',
    publicKey: '456',
    endpoint: 'foo/'
  }

  const expectedResponse = { key: 123 }

  beforeAll(() => {
    axios.post.mockReturnValue(Promise.resolve(expectedResponse))
  })

  afterAll(() => {
    jest.resetAllMocks()
  })


  it('should return the post response', async () => {
    const result = await post(options)

    expect(result).toEqual(expectedResponse)
  })

  it('should build the right api uri', async () => {
    const result = await post(options)

    expect(result).toEqual(expectedResponse)

    const uri = axios.post.mock.calls[0][0]

    expect(isValidUrl(uri)).toEqual(true)

    expect(uri).toEqual(
      expect.stringContaining(options.token)
    )
    expect(uri).toEqual(
      expect.stringContaining(options.publicKey)
    )
    expect(uri).toEqual(
      expect.stringContaining(options.version)
    )
  })
})