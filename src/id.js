var ASSERTFN = require('../assert-fn').ASSERTFN
var option = require('./option')

module.exports = function (v) {
  var _id = function () {
    return option.Some(v)
  }
  _id[ASSERTFN] = true
  return _id
}
