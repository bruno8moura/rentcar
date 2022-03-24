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

  chooseRandomCar (carCategory) {
    const randomCarIndex = this.getRandomPositionArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]

    return carId
  }

  async getAvailableCar (carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    const car = await this.carRepository.find(carId)
    return car
  }
}

module.exports = CarService
