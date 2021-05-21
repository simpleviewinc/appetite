jest.mock('../../utils/api/request')
jest.mock('form-data')
jest.mock('fs')
const fs = require('fs')
const { post } = require('../../utils/api/request')
const { upload } = require('../upload')

describe('upload', () => {

  it('should upload a file to the appetizer api', async () => {
    fs.createReadStream.mockImplementationOnce(path => path)

    const options = { 
      filePath: 'test/path',
      platform: 'ios',
      token: '123',
    }

    await upload(options)

    expect(post).toHaveBeenCalledWith(
      expect.objectContaining({
        token: options.token,
        data: expect.objectContaining({ file: options.filePath }),
        requestConfig: expect.objectContaining({ headers: {}})
      })
    )
  })

  it('should upload a url to the appetizer api', async () => {
    const options = { 
      url: 'foo/bar',
      filePath: null,
      platform: 'ios',
      token: '123',
    }

    await upload(options)

    expect(post).toHaveBeenCalledWith(
      expect.objectContaining({
        token: options.token,
        data: expect.objectContaining({ url: options.url }),
        requestConfig: expect.objectContaining({ headers: {}})
      })
    )
  })
})