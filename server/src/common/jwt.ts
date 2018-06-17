import { JWT_SECRET } from '~/config'
import * as JsonWebToken from 'jsonwebtoken'
import { JWTUser } from '~/common/jwt-user'

const EXPIRE_IN_SECONDS = 60 * 60 * 24 * 365 // 60s * 60m * 24h * 365d

export interface JWTPayloadInterface {
  data: Object
  exp: number
}

export function signJWT(user: JWTUser) {
  const payload: JWTPayloadInterface = {
    data: user.serialized,
    exp: Math.floor(Date.now() / 1000) + EXPIRE_IN_SECONDS,
  }

  return JsonWebToken.sign(payload, JWT_SECRET)
}
