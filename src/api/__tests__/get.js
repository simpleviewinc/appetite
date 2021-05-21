jest.mock('../../utils/api/request')

const { request } = require('../../utils/api/request')
const { get } = require('../')
const { it, expect } = require('@jest/globals')

describe('getAll', () => {

  it('should call get with the token ', async () => {
    const options = { 
      token: '123',
      publicKey: '456'
    }

    const response = await get(options)
    expect(response).toBeDefined()

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({ ...options })
    )
  })

  it('should reject bad input', () => {
    expect(() => get({})).toThrow()
    expect(() => get({ publicKey: '123'})).toThrow()
    expect(() => get({ token: '123'})).toThrow()
  })
})