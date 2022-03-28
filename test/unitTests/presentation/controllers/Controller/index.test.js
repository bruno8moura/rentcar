const chai = require('chai')
const { expect } = require('chai')

const { describe, it } = require('mocha')

chai.use(require('chai-as-promised'))

const Controller = require('../../../../../src/presentation/controllers/Controller')

describe('Controller Suite Test', () => {
  it('should throws an Error if "execute" method is not implemented', async () => {
    const controller = new Controller()

    await expect(controller.execute()).to.be.rejectedWith('Method "execute" must be implemented by you')
  })
})
