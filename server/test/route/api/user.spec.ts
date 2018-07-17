import * as sinon from 'sinon'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import Knex from '~/db/connection'
import { createAuthorizationHeader } from 'test/utils'

import server from '~/index'

chai.use(chaiHttp)
const should = chai.should()

describe('route:api:user', () => {
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

  describe(`POST /api/client/v1/user/signup`, () => {
    it('should get 201 and { jwt } if success w/ email_activated = false', async () => {
      const res = await chai
        .request(server)
        .post(`/api/client/v1/user/signup`)
        .set(
          'Authorization',
          createAuthorizationHeader({
            country_code: '1',
            phone_number: '111111111',
          })
        )
        .send({
          email: 'new_user@example.com',
          display_name: 'Example New User',
        })
      res.should.have.status(201)
      res.body.data.should.include.key('jwt')

      const newUser = await Knex('users')
        .where({ email: 'new_user@example.com' })
        .first()
      chai.expect(newUser.email_activated).to.be.not.ok
    })

    it('should get 401 if JWT not in header', async () => {
      const res = await chai
        .request(server)
        .post(`/api/client/v1/user/signup`)
        .send({
          email: 'new_user@example.com',
          display_name: 'Example New User',
        })
      res.should.have.status(401)
    })

    it('should get 403 if user if already set in jwt', async () => {
      const res = await chai
        .request(server)
        .post(`/api/client/v1/user/signup`)
        .set(
          'Authorization',
          createAuthorizationHeader({
            id: 1,
            country_code: '1',
            phone_number: '111111111',
          })
        )
        .send({
          email: 'new_user@example.com',
          display_name: 'Example New User',
        })
      res.should.have.status(403)
    })

    it('should get 403 if phone number already exist', async () => {
      const res = await chai
        .request(server)
        .post(`/api/client/v1/user/signup`)
        .set(
          'Authorization',
          createAuthorizationHeader({
            country_code: '1',
            phone_number: '8888888888',
          })
        )
        .send({
          email: 'new_user@example.com',
          display_name: 'Example New User',
        })
      res.should.have.status(403)
    })

    it('should get 403 if email already exist', async () => {
      const res = await chai
        .request(server)
        .post(`/api/client/v1/user/signup`)
        .set(
          'Authorization',
          createAuthorizationHeader({
            country_code: '1',
            phone_number: '111111111',
          })
        )
        .send({
          email: 'user@example.com',
          display_name: 'Example User',
        })
      res.should.have.status(403)
    })
  })

  describe(`GET /api/client/v1/user/me`, () => {
    it('should get 200 and return user info', async () => {
      const res = await chai
        .request(server)
        .get(`/api/client/v1/user/me`)
        .set(
          'Authorization',
          createAuthorizationHeader({
            id: 1,
            country_code: '1',
            phone_number: '8888888888',
          })
        )
        .send()

      res.should.have.status(200)
      res.body.data.should.contain({
        country_code: '1',
        phone_number: '8888888888',
        email: 'user@example.com',
        email_activated: true,
        display_name: 'Example User',
        profile_image: 'https://api.adorable.io/avatars/300/0@adorable.png',
      })
    })
  })
})
