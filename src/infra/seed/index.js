const faker = require('faker')
const Car = require('../../entities/Car')
const CarCategory = require('../../entities/CarCategory')
const Customer = require('../../entities/Customer')
const { join } = require('path')
const seederBaseFolder = join(__dirname, '../', 'database')
const mocksBaseFolder = join(__dirname, '../../../test', 'mocks')
const { writeFile } = require('fs/promises')

const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)

})

const cars = []
const customers = []
for (let i = 0; i < ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  carCategory.carIds.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 })
  })
  customers.push(customer)
}

const write = (baseFolder, filename, data) => writeFile(join(baseFolder, filename), JSON.stringify(data))

;(async () => {
  console.log(seederBaseFolder)
  await write(seederBaseFolder, 'cars.json', cars)
  await write(seederBaseFolder, 'carCategory.json', [carCategory])
  await write(seederBaseFolder, 'customers.json', customers)
  await write(mocksBaseFolder, 'valid-car.json', cars[0])
  await write(mocksBaseFolder, 'valid-carCategory.json', carCategory)
  await write(mocksBaseFolder, 'valid-customer.json', customers[0])

  console.log('cars', cars)
  console.log('carCategory', carCategory)
})()
