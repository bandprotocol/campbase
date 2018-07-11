import * as Koa from 'koa'
import * as KoaJWT from 'koa-jwt'
import { JWT_SECRET } from '~/config'
import { DBUserInterface } from '~/common/jwt-user'
import Knex from '~/db/connection'

export function useAuthentication(app: Koa) {
  // Populate error message for unauthorized access
  app.use(async (ctx, next) => {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.fail(401, 'Please send JWT via Authorization header to get access')
      } else throw err
    })
  })

  // Protect APIs
  app.use(
    KoaJWT({ secret: JWT_SECRET, key: 'jwtUser' }).unless({ path: [/^\/auth/] })
  )

  // Populate user object
  app.use(async (ctx, next) => {
    if (ctx.state.jwtUser) {
      const id: number = ctx.state.jwtUser.data.id

      if (id) {
        // Find existing user
        try {
          const user = await Knex('users')
            .where({ id })
            .first()

          if (!user) {
            ctx.fail(400, `No user with id ${ctx.state.jwtUser.data.id} found`)
          }

          ctx.user = <DBUserInterface>user
        } catch (e) {
          ctx.fail()
        }
      } else {
        // New user
        ctx.user = ctx.state.jwtUser.data
      }
    }

    return next()
  })
}
