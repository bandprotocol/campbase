import * as Router from 'koa-router'
import * as Bcrypt from 'bcrypt'
import {
  Exception,
  sendSuccess,
  checkBodyIncludesAllParams,
} from '~/common/endpoint-responses'
import JWT from '~/common/jwt'
import Knex from '~/db/connection'
import * as SMS from '~/external/sms'

import { AUTH_ROOT, PASSWORD_SALT_ROUNDS } from '~/config'

const router = new Router()

/**
 * Request PIN for Login & Register via Phone Number
 * Needs country_code, phone_number
 */
router.post(`${AUTH_ROOT}/request_pin`, async (ctx, next) => {
  checkBodyIncludesAllParams(ctx, ['country_code', 'phone_number'])

  const { country_code, phone_number } = ctx.request.body

  // TODO: Apply rate limit for SMS

  // Send SMS
  try {
    await SMS.sendVerificationCode(country_code, phone_number)
    sendSuccess(ctx)
  } catch (e) {
    throw new Exception(500, 'SMS Service unavailable.')
  }
})

/**
 * Register only via Phone Number
 * Needs country_code, phone_number, phone_pin, email, password, display_name
 */
router.post(`${AUTH_ROOT}/register`, async (ctx, next) => {
  checkBodyIncludesAllParams(ctx, [
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

  // TODO: Check phone_pin
  // TODO: Check data format

  const user_phone = await Knex('users')
    .where({ country_code, phone_number })
    .first()
  // User already exist
  if (user_phone) {
    throw new Exception(400, 'User with this phone number already exists')
  }

  const user_email = await Knex('users')
    .where({ email })
    .first()
  // User already exist
  if (user_email) {
    throw new Exception(400, 'User with this email already exists')
  }

  // Create new user
  const password_hash = await Bcrypt.hash(password, PASSWORD_SALT_ROUNDS)
  await Knex('users').insert({
    phone_number,
    email,
    password_hash,
    activated: false,
    display_name,
    profile_image: `https://api.adorable.io/avatars/300/${phone_number}@adorable.png`,
  })

  sendSuccess(ctx)
  next()
})

/**
 * Login via Phone Number and PIN
 * Needs country_code, phone_number, phone_pin
 */
router.post(`${AUTH_ROOT}/login/phone`, async (ctx, next) => {
  checkBodyIncludesAllParams(ctx, ['country_code', 'phone_number', 'phone_pin'])

  const { country_code, phone_number, phone_pin } = ctx.request.body

  // TODO: Check phone_pin
  const user = await Knex('users')
    .where({ country_code, phone_number })
    .first()

  if (user) {
    const { password_hash, ...userDataWithoutPassword } = user
    const signedJwt = JWT.sign(userDataWithoutPassword)
    sendSuccess(ctx, 200, { jwt: signedJwt })
  } else throw new Exception(400, 'Incorrect phone number')
})

/**
 * Login via Email and Password
 * Needs email, password
 */
router.post(`${AUTH_ROOT}/login/email`, async (ctx, next) => {
  checkBodyIncludesAllParams(ctx, ['email', 'password'])

  const { email, password } = ctx.request.body

  const user = await Knex('users')
    .where({ email })
    .first()

  if (user && user.email_activated) {
    const { password_hash, ...userDataWithoutPassword } = user

    const isCorrectPassword = await Bcrypt.compare(password, password_hash)

    if (isCorrectPassword) {
      const signedJwt = JWT.sign(userDataWithoutPassword)
      sendSuccess(ctx, 200, { jwt: signedJwt })
      next()
    } else throw new Exception(400, 'Incorrect password')
  } else throw new Exception(400, `No user with email ${email}`)
})

export default router
