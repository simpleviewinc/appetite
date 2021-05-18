jest.disableAutomock()
jest.unmock('axios')
jest.unmock('fs')

const { upload } = require('../upload')
const axios = require('axios')

const {
  BUILD_PATH,
  PLATFORM='ios',
  TOKEN,
  URL,
} = process.env

describe('upload', () => {
  beforeAll(() => {
    expect(TOKEN).toBeDefined()
    expect(PLATFORM).toBeDefined()
    expect(BUILD_PATH || URL).toBeDefined()
  })

  it('should upload a file to the api', async () => {
    const response = await upload({
      url: URL,
      filePath: BUILD_PATH,
      platform: PLATFORM,
      token: TOKEN
    }) 

    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.data).toBeDefined()

    console.log('STATUS =', response.status)
    console.log('RESPONSE = \n', JSON.stringify(response.data, null, 2))
  })
})