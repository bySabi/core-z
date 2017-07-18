var AssertCB = require('../assert-cb')

function isFunction(x) { return typeof x === 'function' }
function isObject(x)   { return x !== null && typeof x === 'object' }
function isAssertCB(x) { return isObject(x) && x[AssertCB.prototype.type] === true }

module.exports = {}
module.exports.isFunction = isFunction
module.exports.isAssertCB = isAssertCB
