function AssertCB (p, fn) {
  this.p = !!p
  this.fn = fn
}

// Ideally this must be donde with "Symbol.hasInstance"
// or `const type = Symbol('AssertCB')`
// Using a magic token for ES5 support
var type = '__assertcb747__'

AssertCB.prototype[type] = true
AssertCB.prototype.type = type

module.exports = AssertCB
