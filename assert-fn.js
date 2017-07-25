var option = require('./src/option')
var ASSERTFN = '_2ss3rtFn_'           // magic value for assertFn name

function createAssertFn (f) {
  return function () {
    var args = arguments                  // store assertFn arguments
    return function _2ss3rtFn_(v) {       // store expected value on match
      return function _2ss3rtFn_(x) {     // store value to match
        var r = f(args, x)
        return r ? option.Some(v) : option.None
      }
    }
  }
}

createAssertFn.ASSERTFN = ASSERTFN

module.exports = createAssertFn
