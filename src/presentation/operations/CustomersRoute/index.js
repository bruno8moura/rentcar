const Route = require('../Route')

class CustomersRoute extends Route {
  constructor (listCustomersController) {
    super()
    this.listCustomersController = listCustomersController
  }

  async toRoute ({ method, url }) {
    return this.listCustomersController.execute()
  }
}

module.exports = CustomersRoute
