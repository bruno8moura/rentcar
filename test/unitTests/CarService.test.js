const { describe, it, before, beforeEach, afterEach } = require('mocha')
const CarService = require('../../src/service/CarService')

const { join } = require('path')
const { expect } = require('chai')
const sinon = require('sinon')

const carsDatabase = join(__dirname, './../../src/infra/database', 'cars.json')

const mocks = {
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCar: require('../mocks/valid-car.json'),
  validCustomer: require('../mocks/valid-customer.json')
}
describe('CarService Suite Tests', () => {
  let carService = {}
  let sandbox = {}
  before(() => {
    carService = new CarService({
      cars: carsDatabase
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4]
    const result = carService.getRandomPositionArray(data)

    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory
    const carIdIndex = 0

    sandbox.stub(
      carService,
      carService.getRandomPositionArray.name
    ).returns(carIdIndex)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carIdIndex]

    // eslint-disable-next-line no-unused-expressions
    expect(carService.getRandomPositionArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  it('given a carCategory it should return an available car', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )

    const result = await carService.getAvailableCar(carCategory)
    const expected = car

    // eslint-disable-next-line no-unused-expressions
    expect(carService.chooseRandomCar.calledOnce).to.be.ok

    // eslint-disable-next-line no-unused-expressions
    expect(carService.carRepository.find.calledOnce).to.be.ok

    // eslint-disable-next-line no-unused-expressions
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok

    expect(result).to.be.deep.equal(expected)
  })
})
