var utils = require('./src/utils')
var isFunction = utils.isFunction
var isAssertCB = utils.isAssertCB

function z (x) {
  return function () {
    var fns = arguments;
    for (var i = 0, fn = fns[0]; i < fns.length;) {
      if (!isFunction(fn)) return fn
      var r = fn(x)               // 'r' is AssertCB type ?
      if (!isAssertCB(r)) return r
      var p = r.p
      var f = r.f
      fn = p                       // where to iterate:
        ? f                        //  -- x (right?)
        : fns[++i]                 // |
                                   // y (down?)
    }
  }
}

module.exports = z
