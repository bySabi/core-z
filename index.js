function z () {
  var xs = arguments
  return function () {
    return loop(arguments, xs)
  }
}

function loop (fs, xs) {
  var i = 0
  var f = fs[0]
  while (i < fs.length) {
    switch (true) {
      case !f:
        return f
      case f._ToF_:
        f = f.fn
        break
      case f._ToF_ === false:
        f = fs[++i]
        break
      case typeof f === 'function':
        f = f.apply(null, xs)
        break
      default:
        return f
    }
  }
}

module.exports = z
