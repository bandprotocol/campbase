import * as sinon from 'sinon'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import Knex from '~/db/connection'
import { createCMAuthorizationHeader } from 'test/utils'

import server from '~/index'

chai.use(chaiHttp)
const should = chai.should()

describe('route:api:cm:resources:community', () => {
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

  describe(`POST /api/cm/v1/communities`, () => {
    it('should get 201 if success, and exist created community and wallets', async () => {
      const res = await chai
        .request(server)
        .post(`/api/cm/v1/communities`)
        .set(
          'Authorization',
          createCMAuthorizationHeader({
            id: 1,
            username: 'example_cm_activated',
            email: 'example_cm_activated@example.com',
          })
        )
        .send({
          name: 'Example Community',
          symbol: 'ECC',
          profile_image: 'https://api.adorable.io/avatars/300/0@adorable.png',
          business_name: 'Example Corporation',
          business_address: '1234 Example St.',
          business_country: 'TH',
          business_zipcode: '10330',
          business_phone_number: '+66634567989',
          token_growth_rate: 0.15,
          token_scale: 1.84,
          token_commission: 5,
        })

      res.should.have.status(201)
      res.body.data.should.include.all.keys(
        'id',
        'wallet_address',
        'contract_address'
      )

      // Verify that community and wallet was created
      const { id, wallet_address } = res.body.data
      const community = await Knex('communities')
        .where({ id })
        .first()
      const community_wallet = await Knex('community_wallets')
        .where({ address: wallet_address })
        .first()

      should.exist(community)
      should.exist(community_wallet)
    })
  })

  describe(`GET /api/cm/v1/communities`, () => {
    it('should get 200, with all communities owned by CM', async () => {
      const res = await chai
        .request(server)
        .get(`/api/cm/v1/communities`)
        .set(
          'Authorization',
          createCMAuthorizationHeader({
            id: 1,
            username: 'example_cm_activated',
            email: 'example_cm_activated@example.com',
          })
        )
        .query({})

      res.should.have.status(200)
      res.body.data.should.include.key('communities')
    })
  })
})
