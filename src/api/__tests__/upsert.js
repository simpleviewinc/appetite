jest.mock('../../utils/api/request')
jest.mock('form-data')
jest.mock('fs')

const { mockBuilds } = require('../../utils/api/__mocks__/builds')

let getAllResponse = null

jest.setMock('../getAll', {
  getAll: jest.fn(() => Promise.resolve(getAllResponse || { data: { data: mockBuilds }}))
})

jest.setMock('../update', { update: jest.fn(() => Promise.resolve({})) })
jest.setMock('../upload', { upload: jest.fn(() => Promise.resolve({})) })

const { upsert, update, upload } = require('../')

const options = {
  token: '123',
  payload: {
    platform: 'ios',
    url: 'wow',
  },
  search: {
    platform: 'ios',
    metadata: {
      branch: 'my-branch'
    }
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
      search: {
        ...options.search,
        metadata: {
          branch: 'branch-for-new-build'
        }
      }
    })
    expect(response).toBeDefined()
    expect(upload).toHaveBeenCalled()
  })

  it('should upload, checking the note string', async () => {
    const response = await upsert({
      ...options,
      payload: {
        platform: 'android',
        note: 'wow',
      },
      search: {
        platform: 'android',
        note: 'wow',
        metadata: undefined
      }
    })

    expect(response).toBeDefined()
    expect(upload).toHaveBeenCalled()
  })

  it('should update, checking the note string', async () => {
    const response = await upsert({
      ...options,
      payload: {
        platform: 'android',
        note: mockBuilds[2].note,
      },
      search: {
        platform: 'android',
        note: mockBuilds[2].note,
      }
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
      search: {
        platform: 'ios',
        note: mockBuilds[2].note,
        noteFields: undefined
      }
    })

    expect(response).toBeDefined()
    expect(update).not.toHaveBeenCalled()
    expect(upload).toHaveBeenCalled()
  })

  it('should throw if multiple matching builds are found', () => {
    getAllResponse = [ ...mockBuilds, ...mockBuilds ]

    expect(async () => await upsert({
      ...options,
      search: {
        platform: 'android',
        note: mockBuilds[2].note,
      }
    }).toThrow())

    getAllResponse = null
  })

})