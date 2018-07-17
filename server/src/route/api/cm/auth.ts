import ResourceRouter from '~/common/resource-router'
import { JWTCommunityManager } from '~/common/jwt-cm'
import { CM_SIGNUP_SECRET } from '~/config'
import { signJWT } from '~/common/jwt'
import Knex from '~/db/connection'
import { verifyHash, generateHash } from '~/common/password'

import { Context } from '~/route/interfaces'
import { APIResponseStatus as Status } from 'spec/api/base'
import { AuthSignUp, AuthLogin } from 'spec/api/cm/auth'
import { DBCommunityManagers } from 'spec/db'

const router = new ResourceRouter()

/**
 * POST /auth/cm/v1/signup
 *
 * Signup for a new Community Manager account
 */
router.post(
  AuthSignUp.path,
  async (ctx: Context<AuthSignUp.POST.params, AuthSignUp.POST.response>) => {
    ctx.validate.body.includeParams([
      'email',
      'username',
      'password',
      'secret_code',
    ])

    const { email, username, password, secret_code } = ctx.request.body

    if (secret_code !== CM_SIGNUP_SECRET) {
      ctx.fail(
        Status.UNAUTHORIZED,
        'Incorrect secret code for Community Manager sign up'
      )
    }

    const cm_email = await Knex('community_managers')
      .where({ email })
      .first()
    // CM with this email already exist
    if (cm_email) {
      ctx.fail(
        Status.FORBIDDEN,
        `Community Manager with email ${email} already exists`
      )
    }

    const cm_username = await Knex('community_managers')
      .where({ username })
      .first()
    // CM with this username already exist
    if (cm_username) {
      ctx.fail(
        Status.FORBIDDEN,
        `Community Manager with username ${username} already exists`
      )
    }

    // Generate password hash
    const password_hash = await generateHash(password)

    // Create new user
    const id = await Knex('community_managers')
      .insert({
        username,
        password_hash,
        email,
      })
      .returning('id')

    // Create JWT
    const jwtCM = JWTCommunityManager.createFromDBCommunityManager({
      id: id[0],
      username,
      email,
    })
    const signedJwt = signJWT(jwtCM)
    ctx.success(Status.CREATED, { jwt: signedJwt })
  }
)

/**
 * POST /auth/cm/v1/login
 *
 * Login as Community Manager using username and password
 */
router.post(
  AuthLogin.path,
  async (ctx: Context<AuthLogin.POST.params, AuthLogin.POST.response>) => {
    ctx.validate.body.includeParams(['username', 'password'])

    const { username, password } = ctx.request.body

    const cm = <DBCommunityManagers>await Knex('community_managers')
      .where({ username })
      .first()

    if (!cm) {
      ctx.fail(
        Status.FORBIDDEN,
        `Community Manager with username ${username} does not exist`
      )
    }

    if (await verifyHash(password, cm.password_hash)) {
      if (!cm.email_activated) {
        ctx.fail(
          Status.FORBIDDEN,
          `Email ${cm.email} needs to be activated before using the account`
        )
      }

      // Create JWT
      const jwtCM = JWTCommunityManager.createFromDBCommunityManager(cm)
      const signedJwt = signJWT(jwtCM)
      ctx.success(Status.OK, { jwt: signedJwt })
    } else {
      ctx.fail(Status.FORBIDDEN, 'Incorrect password')
    }
  }
)

export default router
