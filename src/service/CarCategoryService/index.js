const BaseRepository = require('../../repository/BaseRepository')
class CarCategoryService {
  constructor ({ categories }) {
    this.carCategoryRepository = new BaseRepository({ file: categories })
  }

  async listAll () {
    return await this.carCategoryRepository.find()
  }

  async find (id) {
    return await this.carCategoryRepository.find(id)
  }
}

module.exports = CarCategoryService
