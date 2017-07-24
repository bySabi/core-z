function z () {
  var xs = arguments
  return function () {
    return loop(arguments, xs)
  }
}

function loop (fs, xs) {
  var r
  var i = 0
  var f = fs[0]
  while (i < fs.length) {
    if (!isFunction(f)) return f
    r = f.apply(null, xs)
    if (r) {
      // r is an assertcb Type?
      if (r._ToF_ === true) {               // where to iterate:
        f = r.fn                           //  -- x (right?)
      } else if (r._ToF_ === false) {       // |
        f = fs[++i]                       // y (down?)
      } else return r
    } else return r
  }
}

module.exports = z

function isFunction (x) {
  return typeof x === 'function'
}
