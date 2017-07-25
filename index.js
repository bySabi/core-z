var ASSERTFN = require('./assert-fn').ASSERTFN

function z (x) {
  return function () {
    return loop(arguments, x)
  }
}

function loop (fs, x) {
  for (var i = 0, f, _f; i < fs.length; i++) {
    f = _f = fs[i]
    if (f.name !== ASSERTFN) {
      f = f(x)
      if (f.name !== ASSERTFN) throw new Error(_f.toString() + ' is not a assertFn')
    }
    f = f(x)
    if (f.hasValue) return f.value
  }
}

z.id = require('./src/id')

module.exports = z
