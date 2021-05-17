const fs = {
  createReadStream: jest.fn(path => ({ pause: jest.fn(), on: jest.fn(), pipe: jest.fn(), path }))
}

module.exports = {
  default: fs,
  ...fs,
}