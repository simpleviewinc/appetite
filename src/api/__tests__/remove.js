jest.mock('../../utils/api/request')

const { request } = require('../../utils/api/request')
const { remove } = require('..')

describe('remove', () => {

  it('should call api.delete with the token and publicKey', async () => {
    const options = { 
      token: '123',
      publicKey: '456'
    }

    const response = await remove(options)
    expect(response).toBeDefined()

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({ ...options, method: 'delete' })
    )
  })

  it('should reject bad input', () => {
    expect(() => get({})).toThrow()
    expect(() => get({ publicKey: '123'})).toThrow()
    expect(() => get({ token: '123'})).toThrow()
  })
})