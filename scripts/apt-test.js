require('dotenv').config()
const { upload, getAll } = require('../src/api')

const {
  BUILD_PATH,
  PLATFORM,
  TOKEN,
  URL,
} = process.env

if ((!BUILD_PATH && !URL) || !PLATFORM || !TOKEN)
  throw new Error('Ensure all required envs are set.')

;(async () => {
  const [ , , type ] = process.argv

  const fn = ({ upload, getAll })[type]

  const response = await fn({
    url: URL,
    filePath: BUILD_PATH,
    platform: PLATFORM,
    token: TOKEN
  })

  console.log('RESPONSE: \n', JSON.stringify(response.data, null, 2))
})()