const Controller = require('../Controller')
const CarCategoryService = require('../../../service/CarCategoryService')
const CustomerService = require('../../../service/CustomerService')
const CarService = require('../../../service/CarService')

class CalculateRentPriceController extends Controller {
  constructor () {
    super()
    this.carCategoryService = new CarCategoryService({ categories: 'src/infra/database/carCategory.json' })
    this.customerService = new CustomerService({ customers: 'src/infra/database/customers.json' })
    this.carService = new CarService({ cars: 'src/infra/database/cars.json' })
  }

  async execute ({ customerId, categoryId, numberOfTheDays }) {
    const carCategory = await this.carCategoryService.find(categoryId)
    const customer = await this.customerService.find(customerId)
    const price = this.carService.calculateFinalPrice(customer, carCategory, numberOfTheDays)

    return { price }
  }
}

module.exports = CalculateRentPriceController
