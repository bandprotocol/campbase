import ResourceRouter from '~/common/resource-router'
import { JWTUser } from '~/common/jwt-user'
import { signJWT } from '~/common/jwt'
import Knex from '~/db/connection'
import * as SMS from '~/external/sms'

import { Context } from '~/route/interfaces'
import { APIResponseStatus as Status } from 'spec/api/base'
import { AuthRequestPin, AuthValidatePin } from 'spec/api/client/auth'

const router = new ResourceRouter()

/**
 * POST /auth/client/v1/pin/request
 *
 * Request PIN for Login & Register via Phone Number
 * Needs country_code, phone_number
 */
router.post(
  AuthRequestPin.path,
  async (
    ctx: Context<AuthRequestPin.POST.params, AuthRequestPin.POST.response>
  ) => {
    ctx.validate.body.includeParams(['country_code', 'phone_number'])

    const { country_code, phone_number } = ctx.request.body

    // TODO: Apply rate limit for SMS

    // Send SMS
    try {
      await SMS.sendVerificationCode(country_code, phone_number)
      ctx.success()
    } catch (e) {
      ctx.fail(Status.SERVICE_UNAVAILABLE, 'SMS Service unavailable.')
    }
  }
)

/**
 * POST /auth/client/v1/pin/validate
 *
 * Validate PIN - For both existing accounts and new accounts
 * the jwt returned will contain user's id only if account exists
 *
 * Needs country_code, phone_number, phone_pin
 */
router.post(
  AuthValidatePin.path,
  async (
    ctx: Context<AuthValidatePin.POST.params, AuthValidatePin.POST.response>
  ) => {
    ctx.validate.body.includeParams([
      'country_code',
      'phone_number',
      'phone_pin',
    ])

    const { country_code, phone_number, phone_pin } = ctx.request.body

    // Validate phone_pin
    try {
      await SMS.checkVerificationCode(country_code, phone_number, phone_pin)

      let responseData: AuthValidatePin.POST.response

      // Check if the user exist
      try {
        const user = await Knex('users')
          .where({ country_code, phone_number })
          .first()

        if (!user) throw new Error()

        const jwtUser = JWTUser.createFromDBUser(user)
        const signedJwt = signJWT(jwtUser)
        responseData = { jwt: signedJwt, account_created: true }
      } catch (e) {
        const jwtUser = new JWTUser(undefined, country_code, phone_number)
        const signedJwt = signJWT(jwtUser)
        responseData = { jwt: signedJwt, account_created: false }
      }
      ctx.success(Status.OK, responseData)
    } catch (e) {
      ctx.fail(Status.FORBIDDEN, 'Invalid PIN')
    }
  }
)

export default router
