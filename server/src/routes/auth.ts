import * as Router from 'koa-router'
import * as Bcrypt from 'bcrypt'
import * as JsonWebToken from 'jsonwebtoken'
import Knex from '~/db/connection'

import { AUTH_ROOT, PASSWORD_SALT_ROUNDS, JWT_SECRET } from '~/config'

const router = new Router()

/**
 * Register only via Phone Number
 * Needs phone_number, phone_pin, email, password, display_name
 */
router.post(`${AUTH_ROOT}/register`, async (ctx, next) => {
  const {
    phone_number,
    phone_pin,
    email,
    password,
    display_name,
  } = ctx.request.body

  // Check required params
  if (!(phone_number && phone_pin && email && password && display_name)) {
    ctx.status = 400
    ctx.body = {
      error:
        'Expect an object with phone_number, phone_pin, email, password, display_name',
    }
    return
  }

  // TODO: Check phone_pin
  // TODO: Check data format

  const user_phone = await Knex('users')
    .where({ phone_number })
    .first()
  // User already exist
  if (user_phone) {
    ctx.status = 400
    ctx.body = {
      error: 'User with this phone number already exists',
    }
    return
  }

  const user_email = await Knex('users')
    .where({ email })
    .first()
  // User already exist
  if (user_email) {
    ctx.status = 400
    ctx.body = {
      error: 'User with this email already exists',
    }
    return
  }

  // Create new user
  const password_hash = await Bcrypt.hash(password, PASSWORD_SALT_ROUNDS)
  const data = await Knex('users').insert({
    phone_number,
    email,
    password_hash,
    activated: false,
    display_name,
    profile_image: `https://api.adorable.io/avatars/300/${phone_number}@adorable.png`,
  })

  ctx.status = 200
  ctx.body = { success: true }
  next()
})

/**
 * Login via Phone Number and PIN
 * Needs phone_number, phone_pin
 */
router.post(`${AUTH_ROOT}/login_phone`, async (ctx, next) => {
  const { phone_number, phone_pin } = ctx.request.body

  // Check required params
  if (!(phone_number && phone_pin)) {
    ctx.status = 400
    ctx.body = {
      error: 'Expect an object with phone_number, phone_pin',
    }
    return
  }

  // TODO: Check phone_pin

  const user = await Knex('users')
    .where({ phone_number })
    .first()

  if (user) {
    const { password_hash, ...userDataWithoutPassword } = user
    const jwt = JsonWebToken.sign(
      {
        data: userDataWithoutPassword,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365, // 60s * 60m * 24h * 365d
      },
      JWT_SECRET
    )
    ctx.status = 200
    ctx.body = { data: { jwt } }
  } else {
    ctx.status = 400
    ctx.body = {
      error: 'Incorrect phone number or PIN',
    }
    return
  }
})

/**
 * Login via Email and Password
 * Needs email, password
 */
router.post(`${AUTH_ROOT}/login_email`, async (ctx, next) => {
  const { email, password } = ctx.request.body

  // Check required params
  if (!(email && password)) {
    ctx.status = 400
    ctx.body = {
      error: 'Expect an object with email, password',
    }
    return
  }

  const user = await Knex('users')
    .where({ email })
    .first()

  if (user) {
    const { password_hash, ...userDataWithoutPassword } = user

    const isCorrectPassword = await Bcrypt.compare(password, password_hash)

    if (isCorrectPassword) {
      const jwt = JsonWebToken.sign(
        {
          data: userDataWithoutPassword,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365, // 60s * 60m * 24h * 365d
        },
        JWT_SECRET
      )
      ctx.status = 200
      ctx.body = { data: { jwt } }
      next()
    } else {
      ctx.status = 400
      ctx.body = {
        error: `Incorrect password`,
      }
      return
    }
  } else {
    ctx.status = 400
    ctx.body = {
      error: `No user with email ${email}`,
    }
    return
  }
})

export default router
