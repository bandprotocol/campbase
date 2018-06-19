import * as Router from 'koa-router'
import { APIResponseStatus as Status } from 'spec/api/base'

import { API_ROOT } from '~/config'

const router = new Router()

router.get(`${API_ROOT}/user`, async (ctx, next) => {
  ctx.success(Status.OK, { user: ctx.user })
})

export default router
