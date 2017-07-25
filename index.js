var ASSERTFN = require('./assert-fn').ASSERTFN
var id = require('./src/id')

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
    if (!f[ASSERTFN]) {
      f = f.apply(null, xs)
      if (!f[ASSERTFN]) throw new Error(_f.toString() + ' is not a assertFn')
    }
    f = f.apply(null, xs)
    if (f.hasValue) return f.value
  }
}

z.id = id

module.exports = z
