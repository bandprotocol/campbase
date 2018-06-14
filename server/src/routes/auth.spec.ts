import * as Chai from 'chai'
import ChaiHttp = require('chai-http')
import Knex from '~/db/connection'

Chai.use(ChaiHttp)

describe('routes: auth', () => {
  beforeEach(async () => {
    await Knex.migrate.rollback()
    await Knex.migrate.latest()
    await Knex.seed.run()
  })
  afterEach(Knex.migrate.rollback)

  it('should conpare 1 == 1', () => {
    Chai.expect(1).to.equal(1)
  })
})
