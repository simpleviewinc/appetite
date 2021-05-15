const { upload } = require('../upload')

describe('upload', () => {

  it('should upload a file to the appetizer api', async () => {
    const { } = await upload({ 
      filePath: 'test/path',
      platform: 'ios',
      token: '123',
    })

    expect(result).toEqual({
      "publicKey": "123",
      "privateKey": "456",
      "updated": "2021-05-14T22:45:30.783Z",
      "email": "john.smith@simpleviewinc.com",
      "platform": "ios",
      "versionCode": 1,
      "created": "2021-05-14T22:45:30.783Z",
      "architectures": [],
      "appPermissions": {
        "run": "public"
      },
      "publicURL": "https://appetize.io/app/vqv0kym18cn2862ax2xzgxb7r4",
      "appURL": "https://appetize.io/app/vqv0kym18cn2862ax2xzgxb7r4",
      "manageURL": "https://appetize.io/manage/private_9ft1e82mr02a3e2y7kjwvtu494"
    })
  })

})