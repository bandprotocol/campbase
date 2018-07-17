import { JWT_SECRET } from '~/config'
import * as JsonWebToken from 'jsonwebtoken'
import { JWTUser } from '~/common/jwt-user'
import { JWTCommunityManager } from '~/common/jwt-cm'

const SESSION_EXPIRE_IN_SECONDS = 60 * 60 * 24 * 365 // 1 year
const GENERIC_EXPIRE_IN_SECONDS = 60 * 60 * 24 * 1 // 1 day

export interface JWTPayloadInterface {
  data: object
  exp: number
}

export function signJWT(jwt: JWTUser | JWTCommunityManager) {
  const payload: JWTPayloadInterface = {
    data: jwt.serialized,
    exp: Math.floor(Date.now() / 1000) + SESSION_EXPIRE_IN_SECONDS,
  }

  return JsonWebToken.sign(payload, JWT_SECRET)
}

export function signJWTGeneric(data: object, exp?) {
  const payload: JWTPayloadInterface = {
    data,
    exp: exp || Math.floor(Date.now() / 1000) + GENERIC_EXPIRE_IN_SECONDS,
  }

  return JsonWebToken.sign(payload, JWT_SECRET)
}

export function decodeJWT(jwt: string) {
  return JsonWebToken.verify(jwt, JWT_SECRET)
}
