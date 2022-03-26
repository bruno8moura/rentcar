const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('../../index')
const assert = require('assert')

describe('API Suite Test', () => {
  describe('calling /rentcar/categories', () => {
    it('should return http code status 200 when success listing categories', async () => {
      await request(app)
        .get('/rentcar/categories')
        .expect(200)
    })

    it('should return a list when success listing categories', async () => {
      const { body: { data } } = await request(app)
        .get('/rentcar/categories')
        .expect(200)

      assert.ok(Array.isArray(data), true)
    })

    it('should return a list of car category objects when success listing categories', async () => {
      const { body: { data } } = await request(app)
        .get('/rentcar/categories')
        .expect(200)

      const expectedProperties = [
        'id',
        'name',
        'carIds',
        'price'
      ]

      assert.ok(Array.isArray(data), true)
      assert.deepStrictEqual(Object.keys(data[0]), expectedProperties)
    })
  })
})
