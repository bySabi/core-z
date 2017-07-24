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
    if (f) {
      if (f._ToF_ === true) {
        f = f.fn
      } else if (f._ToF_ === false) {
        f = fs[++i]
      } else if (isFunction(f)) {
        f = f.apply(null, xs)
      } else return f
    } else return f
  }
}

module.exports = z

function isFunction (x) {
  return typeof x === 'function'
}
