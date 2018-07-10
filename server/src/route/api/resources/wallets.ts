import ResourceRouter from '~/common/resource-router'
import { APIResponseStatus as Status } from 'spec/api/base'
import Knex from '~/db/connection'

import { Context } from '~/route/interfaces'
import { Wallets } from 'spec/api/resources/wallets'

const router = new ResourceRouter()

/**
 * /api/v1/wallets
 *
 *
 */
router.post(
  Wallets.path,
  async (ctx: Context<Wallets.POST.params, Wallets.POST.response>) => {
    const { verify_key, encrypted_secret_key } = ctx.request.body

    const wallet = await Knex('wallets')
      .where({ verify_key })
      .first()

    if (wallet) {
      ctx.fail(
        Status.FORBIDDEN,
        `Wallet with verify_key ${verify_key} already exists`
      )
    }

    await Knex('wallets').insert({
      user_id: ctx.user.id,
      verify_key,
      encrypted_secret_key,
    })

    ctx.success(Status.CREATED)
  }
)

export default router
