jest.mock('fs')
const { buildRequestPayload } = require('../')
const { createReadStream } = require('fs')

describe('buildRequestPayload', () => {

  afterEach(jest.resetAllMocks)

  it('should create a form and config for filePath', () => {
    const filePath = '/foo/bar'
    const { data, requestConfig } = buildRequestPayload({ filePath })
    expect(data).toBeDefined()
    expect(createReadStream).toHaveBeenCalledWith(filePath)
    expect(requestConfig && typeof requestConfig).toEqual('object')
    expect(typeof requestConfig.headers).toEqual('object')
  })

  it('should create a form and config for url', () => {
    const url = 'foo.bar.com'
    const { data, requestConfig } = buildRequestPayload({ url })
    expect(data).toBeDefined()
    expect(createReadStream).not.toHaveBeenCalled()
    expect(requestConfig && typeof requestConfig).toEqual('object')
    expect(typeof requestConfig.headers).toEqual('object')
  })
})