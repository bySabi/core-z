function z (x) {
  return function () {
    return loop(x, arguments)
  }
}

function loop (x, fns) {
  for (var i = 0, fn = fns[0], r; i < fns.length;) {
    if (!isFunction(fn)) return fn
    r = fn(x)
    // r is assertcb Type?
    if (r) {
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
