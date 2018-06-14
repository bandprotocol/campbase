import { JWT_SECRET } from '~/config'
import * as JsonWebToken from 'jsonwebtoken'

const EXPIRE_IN_SECONDS = 60 * 60 * 24 * 365 // 60s * 60m * 24h * 365d

export default class JWT {
  static sign(data: Object) {
    return JsonWebToken.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + EXPIRE_IN_SECONDS,
      },
      JWT_SECRET
    )
  }
}
