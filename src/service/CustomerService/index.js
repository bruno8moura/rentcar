const BaseRepository = require('../../repository/BaseRepository')
class CustomerService {
  constructor ({ customers }) {
    this.customerRepository = new BaseRepository({ file: customers })
  }

  async listAll () {
    return this.customerRepository.find()
  }

  async find (id) {
    return this.customerRepository.find(id)
  }
}

module.exports = CustomerService
