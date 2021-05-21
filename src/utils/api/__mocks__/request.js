module.exports = {
  post: jest.fn(options => ({
    params: options
  })),
  get: jest.fn(options => ({
    params: options
  })),
  request: jest.fn(options => ({
    params: options
  }))
}