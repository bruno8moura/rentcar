const { ok, notFound, error } = require('../../helpers/httpResponse')
const paths = require('../../Paths')
const Controller = require('../Controller')

class MainController extends Controller {
  constructor ({ controllers }) {
    super()
    this.controllers = controllers
  }

  async execute (request, response) {
    const { method, url } = request
    try {
      if (method === 'GET' && url === paths.categories) {
        const { listCategories } = this.controllers
        const foundCategories = await listCategories.execute()
        const { statusCode, headers, payload } = ok({ data: foundCategories, location: url })

        return response.writeHead(statusCode, headers).end(payload)
      }

      if (method === 'GET' && url === paths.customers) {
        // eslint-disable-next-line no-unused-vars
        const { listCustomers } = this.controllers
        const foundCustomers = await listCustomers.execute()
        const { statusCode, headers, payload } = ok({ data: foundCustomers, location: url })

        return response.writeHead(statusCode, headers).end(payload)
      }

      if (method === 'GET' && url.startsWith(paths.price)) {
        const urlInfo = new URL(url, `http://${request.headers.host}`)
        const customerId = urlInfo.searchParams.get('customerId')
        const categoryId = urlInfo.searchParams.get('categoryId')
        const numberOfTheDays = urlInfo.searchParams.get('days')

        const { calculateRentPrice } = this.controllers
        const calculatedPrice = await calculateRentPrice.execute({ customerId, categoryId, numberOfTheDays })
        const { statusCode, headers, payload } = ok({ data: calculatedPrice, location: url })

        return response.writeHead(statusCode, headers).end(payload)
      }

      if (method === 'GET' && url.startsWith(paths.receipt)) {
        const urlInfo = new URL(url, `http://${request.headers.host}`)
        const customerId = urlInfo.searchParams.get('customerId')
        const categoryId = urlInfo.searchParams.get('categoryId')
        const numberOfTheDays = urlInfo.searchParams.get('days')

        const { generateReceiptRent } = this.controllers
        const generatedReceipt = await generateReceiptRent.execute({ customerId, categoryId, numberOfTheDays })
        const { statusCode, headers, payload } = ok({ data: generatedReceipt, location: url })

        return response.writeHead(statusCode, headers).end(payload)
      }

      if (method === 'GET' && url.startsWith(paths.availables)) {
        const urlInfo = new URL(url, `http://${request.headers.host}`)
        const categoryId = urlInfo.searchParams.get('categoryId')

        const { availablesCarsController } = this.controllers
        const availableCars = await availablesCarsController.execute({ categoryId })
        const { statusCode, headers, payload } = ok({ data: availableCars, location: url })

        return response.writeHead(statusCode, headers).end(payload)
      }

      const { statusCode, headers, payload } = notFound({ location: url })
      return response.writeHead(statusCode, headers).end(payload)
    } catch (e) {
      console.error(e)
      const { statusCode, headers, payload } = error({ location: url })
      return response.writeHead(statusCode, headers).end(payload)
    }
  }
}

module.exports = MainController
