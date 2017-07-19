var AssertCB = require('./assert-cb')

function z (x) {
  return function () {
    return loop(x, arguments)
  }
}

function loop (x, fns) {
  for (var i = 0, fn = fns[0], r; i < fns.length;) {
    if (!isFunction(fn)) return fn
    r = fn(x)                  // 'r' is AssertCB type ?
    if (!isAssertCB(r)) return r
    fn = r.p                       // where to iterate:
      ? r.fn                       //  -- x (right?)
      : fns[++i]                   // |
  }                                // y (down?)
}

module.exports = z

function isFunction (x) {
  return typeof x === 'function'
}

function isAssertCB (x) {
  return x && x[AssertCB.prototype.type]
}
