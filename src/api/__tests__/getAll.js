jest.mock('../../utils/api/request')
jest.mock('form-data')
jest.mock('fs')

const { get } = require('../../utils/api/request')
const { getAll } = require('../getAll')

describe('getAll', () => {

  it('should call get with the token ', async () => {
    const options = { 
      token: '123',
    }

    await getAll(options)

    expect(get).toHaveBeenCalledWith(
      expect.objectContaining({ token: options.token, endpoint: 'apps' })
    )
  })
})