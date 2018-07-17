import * as sinon from 'sinon'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import Knex from '~/db/connection'
import { CM_SIGNUP_SECRET } from '~/config'

import server from '~/index'
import { signJWTGeneric } from 'common/jwt'

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

  describe(`POST /auth/cm/v1/signup`, () => {
    it('should get 201 and { jwt } if success w/ email_activated = false', async () => {
      const res = await chai
        .request(server)
        .post(`/auth/cm/v1/signup`)
        .send({
          email: 'new_cm@example.com',
          username: 'example_new_cm',
          password: 'SOME_RANDOM_PASSWORD@#$%^&*(',
          secret_code: CM_SIGNUP_SECRET,
        })
      res.should.have.status(201)
      res.body.data.should.include.key('jwt')

      const newUser = await Knex('community_managers')
        .where({ email: 'new_cm@example.com' })
        .first()
      chai.expect(newUser.email_activated).to.be.not.ok
    })

    it('should get 403 if cm with the same username already exists', async () => {
      const res = await chai
        .request(server)
        .post(`/auth/cm/v1/signup`)
        .send({
          email: 'new_user@example.com',
          username: 'example_cm',
          password: 'SOME_RANDOM_PASSWORD@#$%^&*(',
          secret_code: CM_SIGNUP_SECRET,
        })
      res.should.have.status(403)
    })

    it('should get 403 if cm with the same email already exists', async () => {
      const res = await chai
        .request(server)
        .post(`/auth/cm/v1/signup`)
        .send({
          email: 'example_cm@example.com',
          username: 'example_cm_not_existed',
          password: 'SOME_RANDOM_PASSWORD@#$%^&*(',
          secret_code: CM_SIGNUP_SECRET,
        })
      res.should.have.status(403)
    })

    it('should get 403 if incorrect secret_code', async () => {
      const res = await chai
        .request(server)
        .post(`/auth/cm/v1/signup`)
        .send({
          email: 'new_cm@example.com',
          username: 'example_new_cm',
          password: 'SOME_RANDOM_PASSWORD@#$%^&*(',
          secret_code: CM_SIGNUP_SECRET + 'SOME_RANDOM_XXXX',
        })
      res.should.have.status(401)
    })

    it('should get 400 if secret_code is not provided', async () => {
      const res = await chai
        .request(server)
        .post(`/auth/cm/v1/signup`)
        .send({
          email: 'new_cm@example.com',
          username: 'example_new_cm',
          password: 'SOME_RANDOM_PASSWORD@#$%^&*(',
        })
      res.should.have.status(400)
    })
  })

  describe(`POST /auth/cm/v1/email_activate`, () => {
    it('should get 200 if provide correct jwt', async () => {
      // Find CM that's not activated
      const cm = await Knex('community_managers')
        .where({ email_activated: 0 })
        .first()

      if (!cm) {
        throw new Error(
          'Seed database needs to have community_manager with email_activated = false'
        )
      }

      const res = await chai
        .request(server)
        .get(`/auth/cm/v1/email_activate`)
        .send({
          jwt: signJWTGeneric({ id: cm.id }),
        })
      res.should.have.status(200)

      const cm_again = await Knex('community_managers')
        .where({ id: cm.id })
        .first()

      should.equal(cm_again.email_activated, 1)
    })

    it('should get 401 if provide malformed jwt', async () => {
      // Find CM that's not activated
      const cm = await Knex('community_managers')
        .where({ email_activated: 0 })
        .first()

      if (!cm) {
        throw new Error(
          'Seed database needs to have community_manager with email_activated = false'
        )
      }

      const res = await chai
        .request(server)
        .get(`/auth/cm/v1/email_activate`)
        .send({
          jwt: 'SOME_RANDOM_JWT',
        })
      res.should.have.status(401)
    })
  })

  describe(`POST /auth/cm/v1/login`, () => {
    it('should get 200 and { jwt } if success on cm w/ email_activated = true', async () => {
      const res = await chai
        .request(server)
        .post(`/auth/cm/v1/login`)
        .send({
          username: 'example_cm_activated',
          password: 'STRONG_PASSWORD',
        })
      res.should.have.status(200)
      res.body.data.should.include.key('jwt')
    })

    it('should get 403 on cm w/ email_activated = false', async () => {
      const res = await chai
        .request(server)
        .post(`/auth/cm/v1/login`)
        .send({
          username: 'example_cm',
          password: 'STRONG_PASSWORD',
        })
      res.should.have.status(403)
    })

    it('should get 403 if incorrect password', async () => {
      const res = await chai
        .request(server)
        .post(`/auth/cm/v1/login`)
        .send({
          username: 'example_cm_activated',
          password: 'SOME_RANDOM_PASSWROD@#$%^&*(',
        })
      res.should.have.status(403)
    })
  })
})
