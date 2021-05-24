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

const metadata = {
  branch: 'some-branch'
}
const platform = PLATFORM

const options = {
  token: TOKEN,
  payload: {
    url: URL,
    filePath: BUILD_PATH,
    platform,
    metadata,
  },
  search: {
    platform,
    metadata,
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

const search = async () => {
  console.log('Searching apps...')
  const [ result ] = await api.search({ token: options.token, ...options.search})
  if (result.publicKey !== state.uploaded.publicKey) {
    console.error({ result, state })
    throw new Error('Search failed')
  }
}

const update = async () => {
  console.log('Updating app...')
  const result = await api.upsert(options)
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
  let success = true
  try {
    await create()
    await wait(1000)
    await search()
    await wait(1000)
    await update()
    await wait(1000)
  }
  catch (err) {
    success = false
    console.error(err)
  }
  finally {
    state.uploaded && await remove()
  }

  success 
    ? console.log('===============\nSuccess!\n===============')
    : process.exit(1)
})()