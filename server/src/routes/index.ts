import * as Koa from 'koa'
import * as JWT from 'koa-jwt'
import * as KoaBodyparser from 'koa-bodyparser'
import GenericRouter from './generic'
import AuthRouter from './auth'
import { JWT_SECRET } from '~/config'
import { Exception } from '~/common/endpoint-responses'

export function useRoutes(app: Koa) {
  app.use(KoaBodyparser())

  app.use(AuthRouter.routes())
  app.use(GenericRouter.routes())
}

export function useAuthentication(app: Koa) {
  app.use(async (ctx, next) => {
    console.log(ctx)
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = 'Please send JWT via Authorization header to get access'
      } else throw err
    })
  })

  app.use(JWT({ secret: JWT_SECRET }).unless({ path: [/^\/auth/] }))
}

export function useCustomException(app: Koa) {
  app.use(async (ctx, next) => {
    try {
      return await next()
    } catch (err) {
      if (err instanceof Exception) {
        ctx.body = err.toObject()
        ctx.status = err.status
      } else {
        ctx.status = 500
        ctx.body = {
          status: 500,
          error: 'Unexpected error. Please contact dev@campbase.co',
        }
      }
    }
  })
}
