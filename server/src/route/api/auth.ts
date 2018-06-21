import ResourceRouter from '~/common/resource-router'
import { JWTUser } from '~/common/jwt-user'
import { signJWT } from '~/common/jwt'
import Knex from '~/db/connection'
import * as SMS from '~/external/sms'
import { generateHash, verifyHash } from '~/common/password'

import { Context } from '~/route/interfaces'
import { APIResponseStatus as Status } from 'spec/api/base'
import {
  AuthRequestPin,
  AuthRegister,
  AuthLoginPhone,
  AuthLoginEmail,
} from 'spec/api/auth'

const router = new ResourceRouter()

/**
 * POST /auth/v1/request_pin
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
 * POST /auth/v1/register
 *
 * Register only via Phone Number
 * Needs country_code, phone_number, phone_pin, email, password, display_name
 */
router.post(
  AuthRegister.path,
  async (
    ctx: Context<AuthRegister.POST.params, AuthRegister.POST.response>
  ) => {
    ctx.validate.body.includeParams([
      'country_code',
      'phone_number',
      'phone_pin',
      'email',
      'password',
      'display_name',
    ])

    const {
      country_code,
      phone_number,
      phone_pin,
      email,
      password,
      display_name,
    } = ctx.request.body

    // TODO: Check data format

    // Check phone_pin
    try {
      await SMS.checkVerificationCode(country_code, phone_number, phone_pin)
    } catch (e) {
      ctx.fail(Status.FORBIDDEN, 'Invalid PIN')
    }

    const user_phone = await Knex('users')
      .where({ country_code, phone_number })
      .first()
    // User already exist
    if (user_phone) {
      ctx.fail(Status.FORBIDDEN, 'User with this phone number already exists')
    }

    const user_email = await Knex('users')
      .where({ email })
      .first()
    // User already exist
    if (user_email) {
      ctx.fail(Status.FORBIDDEN, 'User with this email already exists')
    }

    // Create new user
    const password_hash = await generateHash(password)
    await Knex('users').insert({
      country_code,
      phone_number,
      email,
      password_hash,
      email_activated: false,
      display_name,
      profile_image: `https://api.adorable.io/avatars/300/${phone_number}@adorable.png`,
    })

    ctx.success(201)
  }
)

/**
 * POST /auth/v1/login/phone
 *
 * Login via Phone Number and PIN
 * Needs country_code, phone_number, phone_pin
 */
router.post(
  AuthLoginPhone.path,
  async (
    ctx: Context<AuthLoginPhone.POST.params, AuthLoginPhone.POST.response>
  ) => {
    ctx.validate.body.includeParams([
      'country_code',
      'phone_number',
      'phone_pin',
    ])

    const { country_code, phone_number, phone_pin } = ctx.request.body

    // TODO: Check phone_pin
    const user = await Knex('users')
      .where({ country_code, phone_number })
      .first()

    if (!user) {
      ctx.fail(Status.FORBIDDEN, 'Incorrect phone number')
    }

    const jwtUser = JWTUser.createFromDBUser(user)
    const signedJwt = signJWT(jwtUser)
    const responseData: AuthLoginPhone.POST.response = { jwt: signedJwt }

    ctx.success(Status.OK, responseData)
  }
)

/**
 * POST /auth/v1/login/email
 *
 * Login via Email and Password
 * Needs email, password
 */
router.post(
  AuthLoginEmail.path,
  async (
    ctx: Context<AuthLoginEmail.POST.params, AuthLoginEmail.POST.response>
  ) => {
    ctx.validate.body.includeParams(['email', 'password'])

    const { email, password } = ctx.request.body

    const user = await Knex('users')
      .where({ email })
      .first()

    if (!user) {
      ctx.fail(Status.FORBIDDEN, `No user with email ${email}`)
    }

    const isCorrectPassword = await verifyHash(password, user.password_hash)

    if (!isCorrectPassword) {
      ctx.fail(Status.FORBIDDEN, 'Incorrect password')
    }

    if (!user.email_activated) {
      ctx.fail(Status.FORBIDDEN, `Email ${email} not activated`)
    }

    const jwtUser = JWTUser.createFromDBUser(user)
    const signedJwt = signJWT(jwtUser)

    ctx.success(Status.OK, { jwt: signedJwt })
  }
)

export default router
