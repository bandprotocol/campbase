import * as chai from 'chai'

import { JWTUserInterface, JWTUser } from '~/common/jwt-user'
import { JWT_SECRET } from '~/config'
import * as JsonWebToken from 'jsonwebtoken'

import { signJWT, JWTPayloadInterface, decodeJWT } from '~/common/jwt'

const should = chai.should()

describe('common:jwt-user', () => {
  describe('fn:signJWT', () => {
    it('should generate validly signed JWT from jwtUser instance', async () => {
      const user: JWTUserInterface = {
        id: 1,
        country_code: '1',
        phone_number: '8888888888',
      }
      const mockJWTUser = new JWTUser(
        user.id,
        user.country_code,
        user.phone_number
      )

      const jwt = signJWT(mockJWTUser)
      should.exist(jwt)

      const decodedJwt = <JWTPayloadInterface>(
        JsonWebToken.verify(jwt, JWT_SECRET)
      )
      should.exist(decodedJwt)
      should.exist(decodedJwt.data)
      decodedJwt.data.should.contain(user)
      decodedJwt.data.should.contain({ type: 'user' })
    })
  })

  describe('fn:decodeJWT', () => {
    it('should decode validly signed JWT', async () => {
      const user: JWTUserInterface = {
        id: 1,
        country_code: '1',
        phone_number: '8888888888',
      }
      const mockJWTUser = new JWTUser(
        user.id,
        user.country_code,
        user.phone_number
      )

      const jwt = signJWT(mockJWTUser)
      should.exist(jwt)

      const decodedJwt = <JWTPayloadInterface>decodeJWT(jwt)
      should.exist(decodedJwt)
      should.exist(decodedJwt.data)
      decodedJwt.data.should.contain(user)
      decodedJwt.data.should.contain({ type: 'user' })
    })
  })
})
