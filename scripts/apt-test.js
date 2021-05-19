require('dotenv').config()

const { upload } = require('../src/api')

const {
  BUILD_PATH,
  PLATFORM,
  TOKEN,
  URL,
} = process.env

if ((!BUILD_PATH && !URL) || !PLATFORM || !TOKEN)
  throw new Error('Ensure all required envs are set.')

;(async () => {
  const response = await upload({
    url: URL,
    filePath: BUILD_PATH,
    platform: PLATFORM,
    token: TOKEN
  })

  console.log('RESPONSE: \n', JSON.stringify(response.data, null, 2))
})()