var ASSERTFN = require('./assert-fn').ASSERTFN

function z (x) {
  return function () {
    return loop(arguments, x)
  }
}

function loop (fs, x) {
  for (var i = 0, f, _f; i < fs.length; i++) {
    // save function reference '_f' for Exception message
    f = _f = fs[i]

    // check is 'f' is an assertFn
    // match function can be received in two ways:
    //  * 'anonymous fn' - Ex: z(4)(x => matchFn(true)/* -> */(x))
    //  * 'matchFn'      - Ex: z(4)(matchFn(true)/* -> */('4'))
    // That's why need to be checked two times
    if (f.name !== ASSERTFN) {
      f = f(x)
      if (f.name !== ASSERTFN) throw new Error(_f.toString() + ' is not a assertFn')
    }
    var fr = f(x)    // call assertFn
    if (fr[0]) {     // match ?
      var r = fr[1]  // value to return on match

      // if assertFn back a fr[2] value it will be use
      // like a 'r' argument call
      return fr.length > 2 && typeof r === 'function' ? r(fr[2]) : r
    }
  }
}

z.id = require('./src/id')

module.exports = z
