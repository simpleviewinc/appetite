const FormData = function () {}

FormData.prototype.append = function(key, value) {
  this[key] = value
}
FormData.prototype.getHeaders = function() {
  return { }
}

module.exports = FormData
