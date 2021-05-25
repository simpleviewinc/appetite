const request = jest.fn(options => ({
  params: options
}))

const post = jest.fn(opts => request({ method: 'post', ...opts }))
const get = jest.fn(opts => request({ method: 'get', ...opts }))

module.exports = {
  request,
  post,
  get,
  delete: jest.fn(opts => request({ method: 'delete', ...opts }))
}