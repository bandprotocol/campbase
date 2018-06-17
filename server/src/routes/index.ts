import * as Koa from 'koa'
import * as KoaJWT from 'koa-jwt'
import * as KoaBodyparser from 'koa-bodyparser'
import Knex from '~/db/connection'
import GenericRouter from './generic'
import AuthRouter from './auth'
import UserRouter from './user'
import WalletRouter from './wallet'
import { JWT_SECRET } from '~/config'
import { Exception } from '~/common/endpoint-response'
import { DBUserInterface } from '~/common/jwt-user'

/** Declare 'user' in Koa.Context */
declare module 'koa' {
  interface Context {
    user?: DBUserInterface
  }
}

export function useRoutes(app: Koa) {
  app.use(KoaBodyparser())

  app.use(AuthRouter.routes())
  app.use(UserRouter.routes())
  app.use(WalletRouter.routes())
  app.use(GenericRouter.routes())
}

export function useAuthentication(app: Koa) {
  // Populate error message for unauthorized access
  app.use(async (ctx, next) => {
    // console.log(ctx)
    return next().catch(err => {
      if (err.status === 401) {
        throw new Exception(
          401,
          'Please send JWT via Authorization header to get access'
        )
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
      try {
        const id: number = ctx.state.jwtUser.data.id
        const user = await Knex('users')
          .where({ id })
          .first()

        if (!user) {
          throw new Exception(
            400,
            `No user with id ${ctx.state.jwtUser.data.id} found`
          )
        }

        ctx.user = <DBUserInterface>user
      } catch (e) {
        throw new Error()
      }
    }

    return next()
  })
}

export function useCustomException(app: Koa) {
  app.use(async (ctx, next) => {
    try {
      return await next()
    } catch (err) {
      if (err instanceof Exception) {
        ctx.body = err.getBody()
        ctx.status = err.status
      } else {
        // TODO: Write error log somewhere
        ctx.status = 500
        ctx.body = {
          status: 500,
          error: 'Unexpected error. Please contact dev@campbase.co',
        }
      }
    }
  })
}
