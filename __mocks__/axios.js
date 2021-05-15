const post = jest.fn()
const get = jest.fn()
const put = jest.fn()

const methods = { post, get, put }

module.exports = {
  default: methods,
  ...methods
}