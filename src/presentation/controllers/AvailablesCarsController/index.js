const Controller = require('../Controller')
const CarCategoryService = require('../../../service/CarCategoryService')
const CarService = require('../../../service/CarService')

class AvailablesCarsController extends Controller {
  constructor () {
    super()
    this.carCategoryService = new CarCategoryService({ categories: 'src/infra/database/carCategory.json' })
    this.carService = new CarService({ cars: 'src/infra/database/cars.json' })
  }

  async execute ({ categoryId }) {
    const carCategory = await this.carCategoryService.find(categoryId)
    const availablesCars = await this.carService.getAvailableCar(carCategory)

    return availablesCars
  }
}

module.exports = AvailablesCarsController
