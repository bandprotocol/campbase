import ResourceRouter from '~/common/resource-router'
import { APIResponseStatus as Status } from 'spec/api/base'
import Knex from '~/db/connection'

import { Context } from '~/route/interfaces'
import { UsersId } from 'spec/api/resources/users'

const router = new ResourceRouter()

/**
 * /api/client/v1/users/:id
 *
 *
 */
router.get(
  UsersId.path,
  async (ctx: Context<UsersId.GET.params, UsersId.GET.response>) => {
    const user = await Knex('users')
      .where({ id: ctx.user.id })
      .first()

    ctx.success(Status.OK, { user })
  }
)

export default router
