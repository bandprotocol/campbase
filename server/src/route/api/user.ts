import ResourceRouter from '~/common/resource-router'
import { APIResponseStatus as Status } from 'spec/api/base'
import Knex from '~/db/connection'

import { Context } from '~/route/interfaces'
import { UserSignUp, UserMe } from 'spec/api/user'
import { JWTUser } from 'common/jwt-user'
import { signJWT } from 'common/jwt'

const router = new ResourceRouter()

/**
 * POST /api/v1/signup
 *
 * Register only via Phone Number
 * Needs country_code, phone_number, phone_pin, email, password, display_name
 */
router.post(
  UserSignUp.path,
  async (ctx: Context<UserSignUp.POST.params, UserSignUp.POST.response>) => {
    ctx.validate.body.includeParams(['email', 'display_name'])

    const { email, display_name } = ctx.request.body

    if (ctx.user.id) {
      ctx.fail(Status.FORBIDDEN, 'User already exist')
    }

    const { country_code, phone_number } = ctx.user

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
    await Knex('users').insert({
      country_code,
      phone_number,
      email,
      email_activated: false,
      display_name,
      profile_image: `https://api.adorable.io/avatars/300/${phone_number}@adorable.png`,
    })

    // Create new JWT
    const user = await Knex('users')
      .where({ country_code, phone_number })
      .first()

    const jwtUser = JWTUser.createFromDBUser(user)
    const signedJwt = signJWT(jwtUser)
    const responseData: UserSignUp.POST.response = { jwt: signedJwt }

    ctx.success(201, responseData)
  }
)

/**
 * /api/v1/user/me
 *
 * Returns user info
 */
router.get(
  UserMe.path,
  async (ctx: Context<UserMe.GET.params, UserMe.GET.response>) => {
    const {
      id,
      country_code,
      phone_number,
      email,
      email_activated,
      display_name,
      profile_image,
    } = ctx.user

    ctx.success(Status.OK, {
      id,
      country_code,
      phone_number,
      email,
      email_activated: !!email_activated,
      display_name,
      profile_image,
    })
  }
)

export default router
