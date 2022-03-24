const BaseRepository = require('../../repository/BaseRepository')
const Tax = require('../../entities/Tax')
class CarService {
  constructor ({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })

    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })

    this.taxesBasedOnAge = Tax.taxesBasedOnAge
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

  calculateFinalPrice (customer, carCategory, numberOfDays) {
    const { age } = customer
    const { price } = carCategory
    const { then: tax } = this.taxesBasedOnAge
      .find(tax => age >= tax.from && age <= tax.to)

    const finalPrice = ((tax * price) * (numberOfDays))
    const formattedPrice = this.currencyFormat.format(finalPrice)

    return formattedPrice
  }
}

module.exports = CarService
