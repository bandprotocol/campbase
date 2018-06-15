import * as sinon from 'sinon'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import Knex from '~/db/connection'
import {
  mockSendSMSSuccess,
  mockSendSMSFail,
  mockCheckSMSSuccess,
  mockCheckSMSFail,
} from 'test/mocks'

import { AUTH_ROOT } from '~/config'
import server from '~/index'

chai.use(chaiHttp)
const should = chai.should()

describe('routes:auth', () => {
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
      mockSendSMSSuccess(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/request_pin`)
        .send({ country_code: '66', phone_number: '830088333' })
        .then(res => {
          res.should.have.status(200)
        })
    })

    it('should get 400 if country_code not supplied', async () => {
      mockSendSMSSuccess(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/request_pin`)
        .send({ country_code: '66' })
        .then(res => {
          res.should.have.status(400)
        })
    })

    it('should get 500 if SMS service not available', async () => {
      mockSendSMSFail(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/request_pin`)
        .send({ country_code: '66', phone_number: '830088333' })
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe(`POST ${AUTH_ROOT}/register`, () => {
    it('should get 200 if success w/ email_activated = false', async () => {
      mockCheckSMSSuccess(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/register`)
        .send({
          country_code: '1',
          phone_number: '111111111',
          phone_pin: '1111',
          email: 'new_user@example.com',
          password: 'password',
          display_name: 'Example New User',
        })
        .then(res => {
          res.should.have.status(200)
        })

      const newUser = await Knex('users')
        .where({ email: 'new_user@example.com' })
        .first()
      chai.expect(newUser.email_activated).to.be.not.ok
    })

    it('should get 400 if incorrect PIN', async () => {
      mockCheckSMSFail(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/register`)
        .send({
          country_code: '1',
          phone_number: '111111111',
          phone_pin: '1111',
          email: 'new_user@example.com',
          password: 'password',
          display_name: 'Example New User',
        })
        .then(res => {
          res.should.have.status(400)
        })
    })

    it('should get 400 if phone number already exist', async () => {
      mockCheckSMSFail(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/register`)
        .send({
          country_code: '1',
          phone_number: '123456789',
          phone_pin: '1111',
          email: 'new_user@example.com',
          password: 'password',
          display_name: 'Example New User',
        })
        .then(res => {
          res.should.have.status(400)
        })
    })

    it('should get 400 if email already exist', async () => {
      mockCheckSMSFail(sandbox)
      await chai
        .request(server)
        .post(`${AUTH_ROOT}/register`)
        .send({
          country_code: '1',
          phone_number: '111111111',
          phone_pin: '1111',
          email: 'user@example.com',
          password: 'password',
          display_name: 'Example New User',
        })
        .then(res => {
          res.should.have.status(400)
        })
    })
  })
})
