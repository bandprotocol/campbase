import * as chai from 'chai'

import {
  JWTCommunityManagerInterface,
  JWTCommunityManager,
} from '~/common/jwt-cm'
import { JWT_SECRET } from '~/config'
import * as JsonWebToken from 'jsonwebtoken'

import { signJWT, JWTPayloadInterface, decodeJWT } from '~/common/jwt'

const should = chai.should()

describe('common:jwt-cm', () => {
  describe('fn:signJWT', () => {
    it('should generate validly signed JWT from jwtCommunityManager instance', async () => {
      const cm: JWTCommunityManagerInterface = {
        id: 1,
        email: 'example_cm@gmail.com',
        username: 'example_cm',
      }
      const mockJWTCommunityManager = new JWTCommunityManager(
        cm.id,
        cm.username,
        cm.email
      )

      const jwt = signJWT(mockJWTCommunityManager)
      should.exist(jwt)

      const decodedJwt = <JWTPayloadInterface>(
        JsonWebToken.verify(jwt, JWT_SECRET)
      )
      should.exist(decodedJwt)
      should.exist(decodedJwt.data)
      decodedJwt.data.should.contain(cm)
      decodedJwt.data.should.contain({ type: 'cm' })
    })
  })

  describe('fn:decodeJWT', () => {
    it('should decode validly signed JWT', async () => {
      const cm: JWTCommunityManagerInterface = {
        id: 1,
        email: 'example_cm@gmail.com',
        username: 'example_cm',
      }
      const mockJWTCommunityManager = new JWTCommunityManager(
        cm.id,
        cm.username,
        cm.email
      )

      const jwt = signJWT(mockJWTCommunityManager)
      should.exist(jwt)

      const decodedJwt = <JWTPayloadInterface>decodeJWT(jwt)
      should.exist(decodedJwt)
      should.exist(decodedJwt.data)
      decodedJwt.data.should.contain(cm)
      decodedJwt.data.should.contain({ type: 'cm' })
    })
  })
})
