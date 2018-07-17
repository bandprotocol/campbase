import * as Koa from 'koa'
import * as KoaBodyparser from 'koa-bodyparser'

/** Auth & User */
import ClientAuthRouter from './client/auth'
import ClientUserRouter from './client/user'

/** Resources */
import ClientUsersRouter from './client/resources/users'
import ClientWalletsRouter from './client/resources/wallets'

export function useRoutes(app: Koa) {
  app.use(KoaBodyparser())

  app.use(ClientAuthRouter.routes())
  app.use(ClientUserRouter.routes())
  app.use(ClientWalletsRouter.routes())

  app.use(ClientUsersRouter.routes())
}
