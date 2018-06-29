import * as Koa from 'koa'
import * as KoaBodyparser from 'koa-bodyparser'

import AuthRouter from './auth'
import UserRouter from './user'
import WalletRouter from './wallet'

/** Resources */
import UsersRouter from './resources/users'

export function useRoutes(app: Koa) {
  app.use(KoaBodyparser())

  app.use(AuthRouter.routes())
  app.use(UserRouter.routes())
  app.use(WalletRouter.routes())

  app.use(UsersRouter.routes())
}
