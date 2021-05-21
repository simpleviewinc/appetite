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

// parses command-line arguments
const parseArgs = () => {
  const [ , , type, ...rest ] = process.argv

  let publicKey = PUBLIC_KEY;
  let note = NOTE;
  if (type === 'upsert') {
    note = rest[0] || NOTE
  }
  else {
    publicKey = rest[0] || PUBLIC_KEY
    note = rest[1] || NOTE
  }

  return { publicKey, note, type }
}

;(async () => {

  const { type, note, publicKey } = parseArgs()

  const response = await api[type]({
    url: URL,
    filePath: BUILD_PATH,
    platform: PLATFORM,
    token: TOKEN,
    publicKey,
    note,
    noteFields: {
      branch: BRANCH
    }
  })

  console.log(
    'RESULT: \n', 
    JSON.stringify(type === 'find' ? response : response.data, null, 2)
  )
})()