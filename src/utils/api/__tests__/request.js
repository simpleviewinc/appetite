const { request } = require('..')
const axios = require('axios')
const { isValidUrl } = require('@keg-hub/jsutils')
const { expect } = require('@jest/globals')

const validateBuiltURL = (uri, options) => {
  expect(isValidUrl(uri)).toEqual(true)

  expect(uri).toEqual(
    expect.stringContaining(options.token)
  )

  expect(uri).toEqual(
    expect.stringContaining(options.publicKey)
  )
  expect(uri).toEqual(
    expect.stringContaining('v' + options.version)
  )
}

const options = {
  token: '123',
  requestConfig: { headers: [] },
  version: '399',
  data: 'hello',
  publicKey: '456',
  endpoint: 'foo/'
}

const expectedResponse = { key: 123 }

describe('request (post)', () => {
  beforeAll(() => axios.mockReturnValue(Promise.resolve(expectedResponse)))
  afterAll(jest.resetAllMocks)

  it('should return the post response', async () => {
    const result = await request({ method: 'post', ...options})

    expect(result).toEqual(expectedResponse)
  })

  it('should build the right api uri', async () => {
    const result = await request({ method: 'post', ...options})

    expect(result).toEqual(expectedResponse)

    const { url, method } = axios.mock.calls[0][0]
    expect(method).toEqual('post')
    validateBuiltURL(url, options)
  })
})

describe('request (get)', () => {
  const options = {
    token: '123',
    requestConfig: { headers: [] },
    version: '399',
    data: 'hello',
    publicKey: '456',
    endpoint: 'foo/'
  }

  const expectedResponse = { key: 123 }

  beforeAll(() => axios.mockReturnValue(Promise.resolve(expectedResponse)))
  afterAll(jest.resetAllMocks)

  it('should return the post response', async () => {
    const result = await request(options)

    expect(result).toEqual(expectedResponse)
  })

  it('should build the right api uri', async () => {
    const result = await request(options)

    expect(result).toEqual(expectedResponse)

    const { url, method } = axios.mock.calls[0][0]
    expect(method).toEqual('get')
    validateBuiltURL(url, options)
  })
})