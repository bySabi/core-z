var ASSERTFN = '_2ss3rtFn_'           // magic value for assertFn name

function createAssertFn (f) {
  return function () {
    var args = arguments                   // store assertFn arguments
    return function _2ss3rtFn_ (r) {       // store expected value on match
      return function _2ss3rtFn_ (x) {     // store value to match
        var fr = f(args, x)
        // value on match, 'r', will be called with assertFn
        // returned fr[1]
        return fr.length > 1 ? [fr[0], r, fr[1]] : [fr[0], r]
      }
    }
  }
}

createAssertFn.ASSERTFN = ASSERTFN

module.exports = createAssertFn
