var option = require('./src/option')
var ASSERTFN = '_AssFn747_'           // magic value for

function createAssertFn (f) {
  return function () {
    var args = arguments              // store assertFn arguments
    var _v = function (v) {           // store user passed values
      var _x = function (x) {         // store z value to match
        var r = f(args, x)
        return r ? option.Some(v) : option.None
      }
      _x[ASSERTFN] = true
      return _x
    }
    _v[ASSERTFN] = true
    return _v
  }
}

createAssertFn.ASSERTFN = ASSERTFN

module.exports = createAssertFn
