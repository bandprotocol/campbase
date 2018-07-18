import * as Koa from 'koa'
import * as KoaBodyparser from 'koa-bodyparser'

/** Client Auth & User */
import ClientAuthRouter from './client/auth'
import ClientUserRouter from './client/user'

/** Client Resources */
import ClientUsersRouter from './client/resources/users'
import ClientWalletsRouter from './client/resources/wallets'

/** CM Auth & User */
import CMAuthRouter from './cm/auth'

/** CM Resources */
import CMCommunitiesRouter from './cm/resources/communities'

export function useRoutes(app: Koa) {
  app.use(KoaBodyparser())

  app.use(ClientAuthRouter.routes())
  app.use(ClientUserRouter.routes())
  app.use(ClientWalletsRouter.routes())
  app.use(ClientUsersRouter.routes())

  app.use(CMAuthRouter.routes())
  app.use(CMCommunitiesRouter.routes())
}
