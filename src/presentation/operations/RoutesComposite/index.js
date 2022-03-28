const Route = require('../Route')

class RoutesComposite extends Route {
  constructor (routes) {
    super()
    this.routes = routes
  }

  async toRoute ({ method, pathname, payload }) {
    const operation = this.routes[`${method}:${pathname}`]
    if (!operation) {
      return
    }
    return await operation.toRoute({ method, pathname, payload })
  }
}

module.exports = RoutesComposite
