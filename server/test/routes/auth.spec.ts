import * as sinon from 'sinon'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import Knex from '~/db/connection'
import { mockSMSSuccess, mockSMSFail } from 'test/mocks'

import { AUTH_ROOT } from '~/config'
import server from '~/index'

chai.use(chaiHttp)
const should = chai.should()

describe('routes: auth', () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(async () => {
    sandbox = sinon.createSandbox()
    await Knex.migrate.rollback()
    await Knex.migrate.latest()
    await Knex.seed.run()
  })
  afterEach(async () => {
    await Knex.migrate.rollback()
    sandbox.restore()
  })

  describe(`POST ${AUTH_ROOT}/request_pin`, () => {
    it('should get 200 if all parameters are supplied', async () => {
      mockSMSSuccess(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/request_pin`)
        .send({ country_code: '66', phone_number: '830088333' })
        .then(res => {
          res.should.have.status(200)
        })
    })

    it('should get 400 if country_code not supplied', async () => {
      mockSMSSuccess(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/request_pin`)
        .send({ country_code: '66' })
        .then(res => {
          res.should.have.status(400)
        })
    })

    it('should get 500 if SMS service not available', async () => {
      mockSMSFail(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/request_pin`)
        .send({ country_code: '66', phone_number: '830088333' })
        .then(res => {
          res.should.have.status(500)
        })
    })
  })
})
