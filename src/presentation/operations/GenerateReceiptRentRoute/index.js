const Route = require('../Route')

class GenerateReceiptRentRoute extends Route {
  constructor (generateReceiptRentController) {
    super()
    this.generateReceiptRentController = generateReceiptRentController
  }

  async toRoute ({ method, url, payload: { customerId, categoryId, numberOfTheDays } }) {
    return this.generateReceiptRentController.execute({ customerId, categoryId, numberOfTheDays })
  }
}

module.exports = GenerateReceiptRentRoute
