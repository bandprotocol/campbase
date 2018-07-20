import * as Koa from 'koa'
import * as KoaJWT from 'koa-jwt'
import { JWT_SECRET } from '~/config'
import { DBUsers, DBCommunityManagers } from 'spec/db'
import Knex from '~/db/connection'
import { JWTUser } from '~/common/jwt-user'
import { JWTCommunityManager } from '~/common/jwt-cm'
import { APIResponseStatus } from 'spec/api/base'

export function useAuthentication(app: Koa) {
  // Populate error message for unauthorized access
  app.use(async (ctx, next) => {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.fail(
          401,
          err.message ||
            'Please send JWT via Authorization header to get access'
        )
      } else throw err
    })
  })

  // Protect APIs
  app.use(
    KoaJWT({ secret: JWT_SECRET, key: 'jwt' }).unless({ path: [/^\/auth/] })
  )

  // Read jwt
  app.use(async (ctx, next) => {
    // Populate User
    if (ctx.state.jwt && ctx.state.jwt.data.type === JWTUser.type) {
      const id: number = ctx.state.jwt.data.id

      if (id) {
        // Find existing user
        try {
          const user = await Knex('users')
            .where({ id })
            .first()

          if (!user) {
            ctx.fail(400, `No user with id ${ctx.state.jwt.data.id} found`)
          }

          ctx.user = <DBUsers>user
        } catch (e) {
          ctx.fail()
        }
      } else {
        // New user
        ctx.user = ctx.state.jwt.data
      }
    }

    // Populate CM
    if (ctx.state.jwt && ctx.state.jwt.data.type === JWTCommunityManager.type) {
      const id: number = ctx.state.jwt.data.id

      if (id) {
        // Find existing cm
        try {
          const cm = await Knex('community_managers')
            .where({ id })
            .first()

          if (!cm) {
            ctx.fail(
              400,
              `No CommunityManager with id ${ctx.state.jwt.data.id} found`
            )
          }

          ctx.cm = <DBCommunityManagers>cm
        } catch (e) {
          ctx.fail()
        }
      } else {
        // CM not found
        ctx.fail(APIResponseStatus.UNAUTHORIZED, 'Invalid JWT')
      }
    }

    return next()
  })
}
