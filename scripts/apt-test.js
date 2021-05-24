require('dotenv').config()
const api = require('../src/api')

const {
  BUILD_PATH,
  PLATFORM,
  TOKEN,
  URL,
  BRANCH,
  NOTE,
  PUBLIC_KEY
} = process.env

if ((!BUILD_PATH && !URL) || !PLATFORM || !TOKEN)
  throw new Error('Ensure all required envs are set.')

;(async () => {

  const [ , , type, publicKey=PUBLIC_KEY ] = process.argv

  const response = await api[type]({
    url: URL,
    filePath: BUILD_PATH,
    platform: PLATFORM,
    token: TOKEN,
    publicKey,
    note: NOTE,
    metadata: {
      branch: BRANCH
    },
  })

  console.log(
    'RESULT: \n', 
    JSON.stringify(type === 'search' ? response : response.data, null, 2)
  )
})()