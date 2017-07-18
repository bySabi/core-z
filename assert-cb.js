function AssertCB (o) {
  this.p = o.p
  this.f = o.f
}

// Ideally this must be donde with "Symbol.hasInstance"
// or `const type = Symbol('AssertCB')`
// Using a magic token for ES5 support
var type = '_assertcb747_'

AssertCB.prototype[type] = true
AssertCB.prototype.type = type

module.exports = AssertCB
