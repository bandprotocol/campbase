import * as Koa from 'koa'
import * as KoaBodyparser from 'koa-bodyparser'

/** Auth & User */
import AuthRouter from './auth'
import UserRouter from './user'

/** Resources */
import UsersRouter from './resources/users'
import WalletsRouter from './resources/wallets'

export function useRoutes(app: Koa) {
  app.use(KoaBodyparser())

  app.use(AuthRouter.routes())
  app.use(UserRouter.routes())
  app.use(WalletsRouter.routes())

  app.use(UsersRouter.routes())
}
