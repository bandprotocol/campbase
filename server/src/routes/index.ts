import * as Koa from 'koa'
import * as JWT from 'koa-jwt'
import GenericRouter from './generic'
import AuthRouter from './auth'
import { JWT_SECRET } from '~/config'

export function useRoutes(app: Koa) {
  app.use(AuthRouter.routes())
  app.use(GenericRouter.routes())
}

export function useAuthentication(app: Koa) {
  app.use((ctx, next) => {
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
