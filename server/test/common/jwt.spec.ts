import * as chai from 'chai'
import * as Koa from 'koa'

import { JWTUserInterface, JWTUser } from '~/common/jwt-user'
import { JWT_SECRET } from '~/config'
import * as JsonWebToken from 'jsonwebtoken'

import { signJWT, JWTPayloadInterface } from '~/common/jwt'

const should = chai.should()

describe('common:jwt', () => {
  describe('fn:signJWT', () => {
    it('should generate validly signed JWT from jwtUser instance', async () => {
      const user: JWTUserInterface = {
        id: 1,
        country_code: '1',
        phone_number: '123456789',
        email: 'example@gmail.com',
      }
      const mockJWTUser = <JWTUser>{
        serialized: user,
      }

      const jwt = signJWT(mockJWTUser)
      should.exist(jwt)

      const decodedJwt = <JWTPayloadInterface>(
        JsonWebToken.verify(jwt, JWT_SECRET)
      )
      should.exist(decodedJwt)
      should.exist(decodedJwt.data)
      decodedJwt.data.should.deep.equals(user)
    })
  })
})
