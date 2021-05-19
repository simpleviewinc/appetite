module.exports = {
  post: jest.fn(options => ({
    params: options
  }))
}