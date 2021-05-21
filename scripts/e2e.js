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

const options = {
  url: URL,
  filePath: BUILD_PATH,
  platform: PLATFORM,
  token: TOKEN,
  note: JSON.stringify({ branch: 'some-branch'}),
  noteFields: {
    branch: 'some-branch'
  }
}

const state = {}

const create = async () => {
  console.log('Creating app...')
  const result = await api.upsert(options)
  if (result.status !== 200) {
    console.error({ result, state })
    throw new Error('Create failed')
  }
  state.uploaded = result.data
}

const find = async () => {
  console.log('Finding app...')
  const result = await api.find(options)
  if (result.publicKey !== state.uploaded.publicKey) {
    console.error({ result, state })
    throw new Error('Find failed')
  }
}

const update = async () => {
  console.log('Updating app...')
  const result = await api.upsert({
    ...options,
    publicKey: state.uploaded.publicKey
  })
  if (
    result.status !== 200 || 
    parseInt(result.data.versionCode) !== (parseInt(state.uploaded.versionCode) + 1)
  ) {
    console.error({ result, state })
    throw new Error('Update failed')
  }
}

const remove = async () => {
  console.log('Removing app...')
  const result = await api.remove({
    token: options.token,
    publicKey: state.uploaded.publicKey
  })
  if (result.status !== 200) {
    console.error({ result, state })
    throw new Error('Remove failed')
  }
}

const wait = time => new Promise(res => setTimeout(res, time))

;(async () => {
    await create()
    await wait(1000)
    await find()
    await wait(1000)
    await update()
    await wait(1000)
    await remove()
    console.log('===============\nSuccess!\n===============')
})()