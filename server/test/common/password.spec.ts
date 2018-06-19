import * as chai from 'chai'
import {
  PASSWORD_SALT_ROUNDS,
  verifyHash,
  generateHash,
} from '~/common/password'
import * as Bcrypt from 'bcrypt'

const should = chai.should()

describe('common:password', () => {
  describe('fn:generateHash', () => {
    it("should generate hash that's verifiable w/ bcrypt", async () => {
      const password = 'SOME_RANDOM_PASSWORD!@#$%^&*('
      const hash = await generateHash(password)

      should.exist(hash)

      const correctHash = await Bcrypt.compare(password, hash)
      should.equal(correctHash, true)
    })
  })

  describe('fn:verifyHash', () => {
    it("should verify hash that's generated with w/ bcrypt", async () => {
      const password = 'SOME_RANDOM_PASSWORD!@#$%^&*('
      const hash = await Bcrypt.hash(password, PASSWORD_SALT_ROUNDS)

      const correctHash = await verifyHash(password, hash)
      should.equal(correctHash, true)
    })

    it('should reject password with incorrect hash', async () => {
      const password = 'SOME_RANDOM_PASSWORD!@#$%^&*('
      const fake_password = '!@#$%^&*(FAKE_PASSWORD'
      const hash = await Bcrypt.hash(password, PASSWORD_SALT_ROUNDS)

      const correctHash = await verifyHash(fake_password, hash)
      should.equal(correctHash, false)
    })
  })
})
