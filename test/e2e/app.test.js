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

    it('should return header location and content-type when success listing categories', async () => {
      const { headers } = await request(app)
        .get('/rentcar/categories')
        .expect(200)

      const expectedHeaders = {
        location: '/rentcar/categories',
        'content-type': 'application/json'
      }

      assert.ok(Object.keys(headers).includes(...Object.keys(expectedHeaders)))
    })
  })

  describe('calling /rentcar/customers', () => {
    it('should return http code status 200 when success listing customers', async () => {
      await request(app)
        .get('/rentcar/customers')
        .expect(200)
    })

    it('should return a list when success listing customers', async () => {
      const { body: { data } } = await request(app)
        .get('/rentcar/customers')
        .expect(200)
      console.log(data)
      assert.ok(Array.isArray(data), true)
    })
  })
})
