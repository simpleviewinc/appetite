jest.mock('../../utils/api/request')

const { request } = require('../../utils/api/request')
const { getAll } = require('../getAll')

describe('getAll', () => {

  it('should call get with the token ', async () => {
    const options = { 
      token: '123',
    }

    const response = await getAll(options)
    expect(response).toBeDefined()

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({ token: options.token })
    )
  })

  it('should reject bad input', () => {
    expect(() => getAll({})).toThrow()
  })
})