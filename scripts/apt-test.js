require('dotenv').config()
const api = require('../src/api')

const {
  BUILD_PATH,
  PLATFORM,
  TOKEN,
  URL,
} = process.env

if ((!BUILD_PATH && !URL) || !PLATFORM || !TOKEN)
  throw new Error('Ensure all required envs are set.')

;(async () => {
  const [ , , type, publicKey ] = process.argv

  const fn = api[type]

  const response = await fn({
    url: URL,
    filePath: BUILD_PATH,
    platform: PLATFORM,
    token: TOKEN,
    publicKey
  })

  console.log('RESPONSE: \n', JSON.stringify(response.data, null, 2))
})()