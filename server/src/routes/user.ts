import * as Router from 'koa-router'
import { sendSuccess } from '~/common/endpoint-response'

import { API_ROOT } from '~/config'

const router = new Router()

router.get(`${API_ROOT}/user`, async (ctx, next) => {
  sendSuccess(ctx, 200, { user: ctx.user })
})

export default router
