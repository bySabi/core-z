const z = require('..')
const createAssertFn = require('../assert-fn')

 // 'id' assert
const id = z.id

// 'when' assert
const when = createAssertFn(([p], x) => [p, x])

// 'typeOf' assert
const typeOf = createAssertFn(([t], x) => [typeof x === t]) // eslint-disable-line valid-typeof

/* eslint-env jest */
describe('z()', () => {
  describe('z(numbers)', () => {
    [
      [1, 'one'],
      [2, 2],
      [3, '3'],
      [4, 'any']
    ].forEach(item => {
      it(`z(${item[0]})(...asserts) -> ${item[1]}`, () => {
        const r = z(item[0])(
          x => when(x === 1)/* -> */(x => 'one'),
          x => when(x > 1 && x < 3)/* -> */(a => a),
          x => when(x === 3 && typeof x === 'number')/* -> */('3'),
          x => id/* -> */('any')
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
          x => when(/one/.test(x))/* -> */(1),
          x => when(x === 'two')/* -> */(2)
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
          x => when(x)/* -> */(!x),
          x => when(!x)/* -> */()
        )
        expect(r).toEqual(item[1])
      })
    })
  })

  describe('z(any)', () => {
    [
      ['one', 'one'],
      [2, 'two'],
      [true, 'any']
    ].forEach(item => {
      it(`z(${item[0]})(...asserts) -> ${item[1]}`, () => {
        const r = z(item[0])(
          typeOf('string')/* -> */('one'),
          x => typeOf('number')/* -> */('two'),
          id/* -> */('any')
        )
        expect(r).toEqual(item[1])
      })
    })
  })
})
