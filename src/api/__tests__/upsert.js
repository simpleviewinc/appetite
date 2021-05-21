jest.mock('../../utils/api/request')
jest.mock('form-data')
jest.mock('fs')

const { mockBuilds } = require('../../utils/api/__mocks__/builds')

jest.setMock('../getAll', {
  getAll: jest.fn(() => Promise.resolve({ data: mockBuilds }))
})

jest.setMock('../update', { update: jest.fn(() => Promise.resolve({})) })
jest.setMock('../upload', { upload: jest.fn(() => Promise.resolve({})) })

const { upsert, update, upload } = require('../')

const options = {
  token: '123',
  platform: 'ios',
  url: 'wow',
  noteFields: {
    branch: 'my-branch'
  }
}

describe('upsert', () => {

  beforeEach(() => jest.clearAllMocks())

  it('should update if the app already exists', async () => {
    const response = await upsert(options)
    expect(response).toBeDefined()
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        publicKey: mockBuilds[0].publicKey
      })
    )
  })

  it('should upload if the app does not exist', async () => {
    const response = await upsert({
      ...options,
      noteFields: {
        branch: 'branch-for-new-build'
      }
    })
    expect(response).toBeDefined()
    expect(upload).toHaveBeenCalled()
  })

  it('should upload, checking the note string', async () => {
    const response = await upsert({
      ...options,
      platform: 'android',
      note: 'wow',
      noteFields: undefined
    })

    expect(response).toBeDefined()
    expect(upload).toHaveBeenCalled()
  })

  it('should update, checking the note string', async () => {
    const response = await upsert({
      ...options,
      platform: 'android',
      note: mockBuilds[2].note,
      noteFields: undefined
    })

    expect(response).toBeDefined()
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        publicKey: mockBuilds[2].publicKey
      })
    )
  })

  it('should check the platform', async () => {
    const response = await upsert({
      ...options,
      platform: 'ios',
      note: mockBuilds[2].note,
      noteFields: undefined
    })

    expect(response).toBeDefined()
    expect(update).not.toHaveBeenCalled()
    expect(upload).toHaveBeenCalled()
  })

})