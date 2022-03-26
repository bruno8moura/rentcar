const Controller = require('../Controller')
const CustomerService = require('../../../service/CustomerService')
class ListCustomersController extends Controller {
  constructor () {
    super()
    this.customerService = new CustomerService({ customers: 'src/infra/database/customers.json' })
  }

  async execute () {
    return this.customerService.listAll()
  }
}

module.exports = ListCustomersController
