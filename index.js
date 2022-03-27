const server = require('./src/infra/http/server')
const ListCategoriesController = require('./src/presentation/controllers/ListCategoriesController')
const ListCustomersController = require('./src/presentation/controllers/ListCustomersController')
const CalculateRentPriceController = require('./src/presentation/controllers/CalculateRentPriceController')
const MainController = require('./src/presentation/controllers/MainController')
const GenerateReceiptRentController = require('./src/presentation/controllers/GenerateReceiptRentController')

const mainController = new MainController({
  controllers: {
    listCategories: new ListCategoriesController(),
    listCustomers: new ListCustomersController(),
    calculateRentPrice: new CalculateRentPriceController(),
    generateReceiptRent: new GenerateReceiptRentController()
  }
})

module.exports = server(mainController.execute.bind(mainController))
