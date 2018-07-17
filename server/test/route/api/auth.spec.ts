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

import server from '~/index'
import { decodeJWT } from 'common/jwt'

chai.use(chaiHttp)
const should = chai.should()

describe('route:api:client:auth', () => {
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

  describe(`POST /auth/client/v1/pin/request`, () => {
    it('should get 200 if all parameters are supplied', async () => {
      mockSendSMSSuccess(sandbox)
      const res = await chai
        .request(server)
        .post(`/auth/client/v1/pin/request`)
        .send({ country_code: '66', phone_number: '830088333' })

      res.should.have.status(200)
    })

    it('should get 400 if country_code not supplied', async () => {
      mockSendSMSSuccess(sandbox)
      const res = await chai
        .request(server)
        .post(`/auth/client/v1/pin/request`)
        .send({ country_code: '66' })

      res.should.have.status(400)
    })

    it('should get 503 if SMS service not available', async () => {
      mockSendSMSFail(sandbox)
      const res = await chai
        .request(server)
        .post(`/auth/client/v1/pin/request`)
        .send({ country_code: '66', phone_number: '830088333' })

      res.should.have.status(503)
    })
  })

  describe(`POST /auth/client/v1/pin/validate`, () => {
    it('should get 403 if incorrect PIN', async () => {
      mockCheckSMSFail(sandbox)
      const res = await chai
        .request(server)
        .post(`/auth/client/v1/pin/validate`)
        .send({
          country_code: '1',
          phone_number: '111111111',
          phone_pin: '1111',
        })

      res.should.have.status(403)
    })

    it('should get 200 and JWT without user id if correct PIN and user not exists', async () => {
      mockCheckSMSSuccess(sandbox)
      const res = await chai
        .request(server)
        .post(`/auth/client/v1/pin/validate`)
        .send({
          country_code: '1',
          phone_number: '111111111',
          phone_pin: '1111',
        })

      res.should.have.status(200)
      res.body.data.should.includes.key('jwt')

      const jwt = res.body.data.jwt
      const jwtDecoded: any = decodeJWT(jwt)

      should.exist(jwtDecoded)
      jwtDecoded.data.should.not.include.key('id')
      jwtDecoded.data.should.deep.equal({
        country_code: '1',
        phone_number: '111111111',
      })
    })

    it('should get 200 and JWT with user id if correct PIN and user exists', async () => {
      mockCheckSMSSuccess(sandbox)
      const res = await chai
        .request(server)
        .post(`/auth/client/v1/pin/validate`)
        .send({
          country_code: '1',
          phone_number: '8888888888',
          phone_pin: '1111',
        })

      res.should.have.status(200)
      res.body.data.should.includes.key('jwt')

      const jwt = res.body.data.jwt
      const jwtDecoded: any = decodeJWT(jwt)

      should.exist(jwtDecoded)
      jwtDecoded.data.should.include.key('id')
      jwtDecoded.data.should.contain({
        country_code: '1',
        phone_number: '8888888888',
      })
    })
  })
})
