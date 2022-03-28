const { ok, notFound, error } = require('../../helpers/httpResponse')
const Controller = require('../Controller')

class MainController extends Controller {
  constructor (routesComposite) {
    super()
    this.routesComposite = routesComposite
  }

  async execute (request, response) {
    const { method, url } = request
    const urlInfo = new URL(url, `http://${request.headers.host}`)
    try {
      const payloadToRoute = this._queryStringToJson(urlInfo.searchParams.toString())
      const data = await this.routesComposite.toRoute({ method, pathname: urlInfo.pathname, payload: payloadToRoute })

      const { statusCode, headers, payload } = data ? ok({ data, location: url }) : notFound({ location: url })
      return response.writeHead(statusCode, headers).end(payload)
    } catch (e) {
      console.error(e)
      const { statusCode, headers, payload } = error({ location: url })
      return response.writeHead(statusCode, headers).end(payload)
    }
  }

  _queryStringToJson (queryString) {
    const result = {}
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=')
      result[key] = value
    })

    return result
  }
}

module.exports = MainController
