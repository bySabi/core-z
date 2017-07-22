function z () {
  var xs = arguments
  return function () {
    return loop(arguments, xs)
  }
}

function loop (fns, xs) {
  var r
  var i = 0
  var fn = fns[0]
  while (i < fns.length) {
    if (!isFunction(fn)) return fn
    r = fn.apply(null, xs)
    if (r) {
      // r is an assertcb Type?
      if (r._ToF_ === true) {               // where to iterate:
        fn = r.fn                           //  -- x (right?)
      } else if (r._ToF_ === false) {       // |
        fn = fns[++i]                       // y (down?)
      } else return r
    } else return r
  }
}

module.exports = z

function isFunction (x) {
  return typeof x === 'function'
}
