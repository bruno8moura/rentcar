const Route = require('../Route')

class CategoriesRoute extends Route {
  constructor (listCategoriesController) {
    super()
    this.listCategoriesController = listCategoriesController
  }

  async toRoute ({ method, url }) {
    return this.listCategoriesController.execute()
  }
}

module.exports = CategoriesRoute
