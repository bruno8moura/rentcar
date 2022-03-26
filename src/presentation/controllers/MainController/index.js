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
      const [listCategoriesController] = this.controllers
      const foundCategories = await listCategoriesController.execute()
      response.writeHead(200, {
        'Content-Type': 'application/json',
        Location: paths.categories
      })

      const payload = {
        data: foundCategories
      }

      return response.end(JSON.stringify(payload))
    }

    response.write('ai...')
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
