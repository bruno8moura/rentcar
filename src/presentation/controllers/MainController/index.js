const paths = require('../../Paths')
const Controller = require('../Controller')

class MainController extends Controller {
  constructor ({ controllers }) {
    super()
    this.controllers = controllers
  }

  async handler (request, response) {
    const { method, url } = request

    if (method === 'GET' && url === paths.categories) {
      const { listCategories } = this.controllers
      const foundCategories = await listCategories.execute()
      response.writeHead(200, {
        'Content-Type': 'application/json',
        Location: paths.categories
      })

      const payload = {
        data: foundCategories
      }

      return response.end(JSON.stringify(payload))
    }

    if (method === 'GET' && url === paths.customers) {
      // eslint-disable-next-line no-unused-vars
      const { listCustomers } = this.controllers
      const foundCustomers = await listCustomers.execute()
      response.writeHead(200, {
        'Content-Type': 'application/json',
        Location: paths.customers
      })

      const payload = {
        data: foundCustomers
      }

      return response.end(JSON.stringify(payload))
    }

    if (method === 'GET' && url.startsWith(paths.price)) {
      const urlInfo = new URL(url, `http://${request.headers.host}`)
      const customerId = urlInfo.searchParams.get('customerId')
      const categoryId = urlInfo.searchParams.get('categoryId')
      const numberOfTheDays = urlInfo.searchParams.get('days')

      const { calculateRentPrice } = this.controllers
      const calculatedPrice = await calculateRentPrice.execute({ customerId, categoryId, numberOfTheDays })
      response.writeHead(200, {
        'Content-Type': 'application/json',
        Location: url
      })

      return response.end(JSON.stringify(calculatedPrice))
    }

    response.writeHead(404)
    return response.end()
  }

  handleError (error, response) {
    if (error.message.includes('ENOENT')) {
      // logger.warn(`asset not found ${error.stack}`)
      console.log(`asset not found ${error.stack}`)
      response.writeHead(404)

      return response.end()
    }

    // logger.error(`caught error on API ${error.stack}`)
    console.error(`caught error on API ${error.stack}`)
    response.writeHead(500)

    return response.end()
  }

  async execute (request, response) {
    return this.handler(request, response)
      .catch(err => this.handleError(err, response))
  }
}

module.exports = MainController
