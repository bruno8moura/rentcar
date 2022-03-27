const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('../../index')
const assert = require('assert')

const mocks = {
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCustomer: require('../mocks/valid-customer.json')
}

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

      assert.ok(Array.isArray(data), true)
    })

    it('should return a list of customers objects when success listing customers', async () => {
      const { body: { data } } = await request(app)
        .get('/rentcar/customers')
        .expect(200)

      const expectedProperties = [
        'id',
        'name',
        'age'
      ]

      assert.ok(Array.isArray(data), true)
      assert.deepStrictEqual(Object.keys(data[0]), expectedProperties)
    })

    it('should return header location and content-type when success listing customers', async () => {
      const { headers } = await request(app)
        .get('/rentcar/customers')
        .expect(200)

      const expectedHeaders = {
        location: '/rentcar/customers',
        'content-type': 'application/json'
      }

      const checkExpectedItems = (allItems, receivedItens) => receivedItens.every(item => allItems.includes(item))

      assert.ok(checkExpectedItems(Object.keys(headers), Object.keys(expectedHeaders)))
      assert.ok(checkExpectedItems(Object.values(headers), Object.values(expectedHeaders)))
    })
  })

  describe('calling /rentcar/price', () => {
    it('should calculate price based on customer id, category id and how many days the user wish keeping rent car',
      async () => {
        const customerId = mocks.validCustomer.id
        const categoryId = mocks.validCarCategory.id
        const numberOfTheDays = 5

        const requestedUrl = `/rentcar/price?customerId=${customerId}&days=${numberOfTheDays}&categoryId=${categoryId}`
        const { headers, body: result } = await request(app)
          .get(requestedUrl)
          .expect(200)

        const expectedHeaders = {
          location: requestedUrl,
          'content-type': 'application/json'
        }

        const checkExpectedItems = (allItems, receivedItens) => receivedItens.every(item => allItems.includes(item))

        const expectedProperties = ['price']
        assert.ok(checkExpectedItems(Object.keys(headers), Object.keys(expectedHeaders)))
        assert.ok(checkExpectedItems(Object.values(headers), Object.values(expectedHeaders)))
        assert.deepStrictEqual(Object.keys(result), expectedProperties)
      })
  })

  describe('calling /rentcar/receipt', () => {
    it('should generate rent receipt based on customer id, category id and how many days the user wish keeping rent car',
      async () => {
        const customerId = mocks.validCustomer.id
        const categoryId = mocks.validCarCategory.id
        const numberOfTheDays = 5

        const requestedUrl = `/rentcar/receipt?customerId=${customerId}&days=${numberOfTheDays}&categoryId=${categoryId}`
        const { headers, body: result } = await request(app)
          .get(requestedUrl)
          .expect(200)

        const expectedHeaders = {
          location: requestedUrl,
          'content-type': 'application/json'
        }

        const checkExpectedItems = (allItems, receivedItens) => receivedItens.every(item => allItems.includes(item))

        const expectedProperties = ['customer', 'car', 'amount', 'dueDate']
        assert.ok(checkExpectedItems(Object.keys(headers), Object.keys(expectedHeaders)))
        assert.ok(checkExpectedItems(Object.values(headers), Object.values(expectedHeaders)))
        assert.deepStrictEqual(Object.keys(result), expectedProperties)
      })
  })
})
