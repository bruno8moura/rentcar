const server = require('./src/infra/http/server')
const ListCategoriesController = require('./src/presentation/controllers/ListCategoriesController')
const ListCustomersController = require('./src/presentation/controllers/ListCustomersController')
const MainController = require('./src/presentation/controllers/MainController')

const mainController = new MainController({
  controllers: [
    new ListCategoriesController(),
    new ListCustomersController()
  ]
})

module.exports = server(mainController.execute.bind(mainController))
