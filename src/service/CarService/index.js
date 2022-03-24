const BaseRepository = require('../../repository/BaseRepository')

class CarService {
  constructor ({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
  }

  getRandomPositionArray (list) {
    const listLength = list.length
    return Math.floor(
      Math.random() * (listLength)
    )
  }

  async getAvailableCar (carCategory) {
    return null
  }
}

module.exports = CarService
