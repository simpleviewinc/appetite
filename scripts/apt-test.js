require('dotenv').config()

const { upload } = require('../src/api')

const {
  BUILD_PATH,
  PLATFORM='ios',
  TOKEN,
  URL,
} = process.env

;(async () => {
  const response = await upload({
    url: URL,
    filePath: BUILD_PATH,
    platform: PLATFORM,
    token: TOKEN
  })


  console.log('RESPONSE: \n', JSON.stringify(response.data, null, 2))
})()