const Route = require('../Route')

class CalculateRentPriceRoute extends Route {
  constructor (calculateRentPriceController) {
    super()
    this.calculateRentPriceController = calculateRentPriceController
  }

  async toRoute ({ method, url, payload: { customerId, categoryId, numberOfTheDays } }) {
    return this.calculateRentPriceController.execute({ customerId, categoryId, numberOfTheDays })
  }
}

module.exports = CalculateRentPriceRoute
