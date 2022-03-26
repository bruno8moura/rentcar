const Controller = require('../Controller')
const CarCategoryService = require('../../../service/CarCategoryService')
class ListCategoriesController extends Controller {
  constructor () {
    super()
    this.carCategoryService = new CarCategoryService({ categories: 'src/infra/database/carCategory.json' })
  }

  async execute () {
    return await this.carCategoryService.listAll()
  }
}

module.exports = ListCategoriesController
