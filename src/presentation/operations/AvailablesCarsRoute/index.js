const Route = require('../Route')

class AvailablesCarsRoute extends Route {
  constructor (availablesCarsController) {
    super()
    this.availablesCarsController = availablesCarsController
  }

  async toRoute ({ method, url, payload: { categoryId } }) {
    return this.availablesCarsController.execute({ categoryId })
  }
}

module.exports = AvailablesCarsRoute
