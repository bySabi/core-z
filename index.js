var ASSERTFN = require('./assert-fn').ASSERTFN

function z () {
  var xs = arguments
  return function () {
    return loop(arguments, xs)
  }
}

function loop (fs, xs) {
  for (
    var i = 0, _f, f = _f = fs[0];
    i < fs.length;
    i++, f = _f = fs[i]
  ) {
    if (f.name !== ASSERTFN) {
      f = f.apply(null, xs)
      if (f.name !== ASSERTFN) throw new Error(_f.toString() + ' is not a assertFn')
    }
    f = f.apply(null, xs)
    if (f.hasValue) return f.value
  }
}

z.id = require('./src/id')

module.exports = z
