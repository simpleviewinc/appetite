const axios = jest.fn()
axios.post = jest.fn()
axios.get = jest.fn()
axios.put = jest.fn()

module.exports = axios