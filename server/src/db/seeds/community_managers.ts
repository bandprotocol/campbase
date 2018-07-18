/**
 * Password: STRONG_PASSWORD
 * HASH: $2b$10$ZTjQoGBlZGDOMWCPEMSTjeUlm4.FUepMaM/w8XE4HkTXdSUIUfQVK
 */

import * as Knex from 'knex'

const password_hash =
  '$2b$10$ZTjQoGBlZGDOMWCPEMSTjeUlm4.FUepMaM/w8XE4HkTXdSUIUfQVK'

exports.seed = async (knex: Knex): Promise<any> => {
  // Deletes ALL existing community_managers
  await knex('community_managers').del()
  // Inserts seed community_managers
  const cmIds = await knex('community_managers')
    .insert([
      {
        username: 'example_cm',
        password_hash,
        email: 'example_cm@example.com',
        email_activated: false,
      },
      {
        username: 'example_cm_activated',
        password_hash,
        email: 'example_cm_activated@example.com',
        email_activated: true,
      },
    ])
    .returning('id')

  const wallet_address = 'AX33 DEDE DEDE DEDE DEDE DEDE DEDE DEDE DEDE'

  // Deletes ALL existing community_wallets
  await knex('community_wallets').del()
  // Inserts seed community_wallets
  await knex('community_wallets').insert({
    sk: 'SOME_RANDOM_SK',
    vk: 'SOME_RANDOM_VK',
    address: wallet_address,
  })

  // Deletes ALL existing communities
  await knex('communities').del()
  // Inserts seed communities
  await knex('communities').insert([
    {
      name: 'Seeded Example Community',
      symbol: 'SEC',
      profile_image: 'https://api.adorable.io/avatars/300/0@adorable.png',
      business_name: 'Seeded Example Corporation',
      business_address: '1234 Example St.',
      business_country: 'TH',
      business_zipcode: '10330',
      business_phone_number: '+66634567989',

      community_manager_id: cmIds[0],
      wallet_address,
      contract_address: 'BX55 DEDE DEDE DEDE DEDE DEDE DEDE DEDE DEDE',
    },
  ])
}
