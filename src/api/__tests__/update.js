jest.mock('../../utils/api/request')
jest.mock('form-data')
const { post } = require('../../utils/api/request')
const { update } = require('../')
const { omitKeys } = require('@keg-hub/jsutils')

describe('update', () => {

  const options = { 
    token: '123',
    publicKey: 'abc',
    url: 'my.url.com'
  }

  it('should update a build on the appetizer api', async () => {
    const response = await update(options)
    expect(response).toBeDefined()

    expect(post).toHaveBeenCalledWith(
      expect.objectContaining({
        publicKey: options.publicKey,
        token: options.token,
        requestConfig: expect.objectContaining({ headers: {}})
      })
    )
  })

  it('should throw with bad input', () => {
    expect(() => update({})).toThrow()
    expect(() => update(omitKeys(options, ['token']))).toThrow()
    expect(() => update(omitKeys(options, ['publicKey']))).toThrow()
  })

})