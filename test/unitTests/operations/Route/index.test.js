const chai = require('chai')
const { expect } = require('chai')

const { describe, it } = require('mocha')

chai.use(require('chai-as-promised'))

const Route = require('../../../../src/presentation/operations/Route')

describe('Route Suite Test', () => {
  it('should throws an Error if "toRoute" method is not implemented', async () => {
    const route = new Route()

    await expect(route.toRoute('any')).to.be.rejectedWith('This method must be implemented')
  })
})
