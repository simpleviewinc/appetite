const postPath = '../../utils/api/post'
jest.mock(postPath)
const { post } = require(postPath)
const { upload } = require('../upload')

describe('upload', () => {

  it('should upload a file to the appetizer api', async () => {
    await upload({ 
      filePath: 'test/path',
      platform: 'ios',
      token: '123',
    })
    expect(post).toHaveBeenCalled()
  })
})