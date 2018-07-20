import ResourceRouter from '~/common/resource-router'
import { APIResponseStatus as Status } from 'spec/api/base'
import Knex from '~/db/connection'

import { createContract, createWallet } from '~/external/blockchain'

import { Context } from '~/route/interfaces'
import { Communities } from 'spec/api/cm/resources/communities'

const router = new ResourceRouter()

/**
 * POST /api/cm/v1/communities
 *
 * Create a new community with a newly generate wallet and
 * contract, which can be used to buy/sell token for this
 * community
 */
router.post(
  Communities.path,
  async (ctx: Context<Communities.POST.params, Communities.POST.response>) => {
    ctx.validate.body.includeParams([
      'name',
      'symbol',
      'profile_image',
      'business_name',
      'business_address',
      'business_country',
      'business_zipcode',
      'business_phone_number',
      'token_growth_rate',
      'token_scale',
      'token_commission',
    ])

    const {
      name,
      symbol,
      profile_image,
      business_name,
      business_address,
      business_country,
      business_zipcode,
      business_phone_number,
      token_growth_rate,
      token_scale,
      token_commission,
    } = ctx.request.body

    // Create wallet
    const {
      secretKey: sk,
      verifyKey: vk,
      address: wallet_address,
    } = createWallet()

    // Save wallet to database
    await Knex('community_wallets').insert({
      sk,
      vk,
      address: wallet_address,
    })

    // Create contract
    const contract_address = await createContract(
      sk,
      token_growth_rate,
      token_scale,
      token_commission
    )

    const { id: community_manager_id } = ctx.cm

    // Save Community
    const id = await Knex('communities')
      .insert({
        name,
        symbol,
        profile_image,
        business_name,
        business_address,
        business_country,
        business_zipcode,
        business_phone_number,

        community_manager_id,
        wallet_address,
        contract_address,
      })
      .returning('id')

    ctx.success(Status.CREATED, {
      id: id[0],
      wallet_address,
      contract_address,
    })
  }
)

/**
 * GET /api/cm/v1/communities
 *
 * Get all communities that owned by current CM
 */
router.get(
  Communities.path,
  async (ctx: Context<Communities.GET.params, Communities.GET.response>) => {
    const { id: community_manager_id } = ctx.cm

    // Save Community
    const communities = await Knex('communities').where({
      community_manager_id,
    })

    ctx.success(Status.OK, { communities })
  }
)

export default router
