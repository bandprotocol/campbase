import ResourceRouter from '~/common/resource-router'
import { APIResponseStatus as Status } from 'spec/api/base'
import Knex from '~/db/connection'

import BandProtocolClient from 'bandprotocol'
import { Context } from '~/route/interfaces'
import { Wallets } from 'spec/api/resources/wallets'

const router = new ResourceRouter()

/**
 * /api/client/v1/wallets
 *
 * Save wallet address for current user. The user has to send
 * `signature` by signing the user_id string with his/her
 * secret key to verify ownership of the wallet
 */
router.post(
  Wallets.path,
  async (ctx: Context<Wallets.POST.params, Wallets.POST.response>) => {
    const { verify_key, encrypted_secret_key, signature } = ctx.request.body

    // Verify ownership
    if (
      !BandProtocolClient.verifySignature(
        signature,
        ctx.user.id.toString(16),
        verify_key
      )
    ) {
      ctx.fail(Status.FORBIDDEN, 'Wallet signature verification failed')
    }

    const wallet = await Knex('wallets')
      .where({ verify_key })
      .first()

    if (wallet) {
      // Update wallet owner
      await Knex('wallets')
        .where({ verify_key })
        .update({ user_id: ctx.user.id })
    } else {
      // Insert new wallet
      await Knex('wallets').insert({
        user_id: ctx.user.id,
        verify_key,
        encrypted_secret_key,
      })
    }

    ctx.success(Status.CREATED)
  }
)

export default router
