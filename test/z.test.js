const z = require('..')
const AssertCB = require('../assert-cb')

// 'when' assert
const when = p => f => new AssertCB(p, f)

// 'id' assert
const id = when(true)

/* eslint-env jest */
describe('z()', () => {
  describe('z(numbers)', () => {
    [
      [1, 'one'],
      [2, 'two'],
      [3, '3'],
      [4, 'any']
    ].forEach(item => {
      it(`z(${item[0]})(...asserts) -> ${item[1]}`, () => {
        const r = z(item[0])(
          x => when(x === 1)(x => 'one'),
          x => when(x > 1 && x < 3)('two'),
          x => when(x === 3 && typeof x === 'number')(x => `${x}`),
          x => id('any')
        )
        expect(r).toEqual(item[1])
      })
    })
  })

  describe('z(string)', () => {
    [
      ['one', 1],
      ['two', 2]
    ].forEach(item => {
      it(`z('${item[0]}')(...asserts) -> ${item[1]}`, () => {
        const r = z(item[0])(
          x => when(/one/.test(x))(x => 1),
          x => when(x === 'two')(2)
        )
        expect(r).toEqual(item[1])
      })
    })
  })

  describe('z(boolean)', () => {
    [
      [true, false],
      [false]
    ].forEach(item => {
      it(`z(${item[0]})(...asserts) -> ${item[1]}`, () => {
        const r = z(item[0])(
          x => when(x)(!x),
          x => when(!x)()
        )
        expect(r).toEqual(item[1])
      })
    })
  })
})
