/**
 * Password: STRONG_PASSWORD
 * HASH: $2b$10$ZTjQoGBlZGDOMWCPEMSTjeUlm4.FUepMaM/w8XE4HkTXdSUIUfQVK
 */

import * as Knex from 'knex'

const password_hash =
  '$2b$10$ZTjQoGBlZGDOMWCPEMSTjeUlm4.FUepMaM/w8XE4HkTXdSUIUfQVK'

exports.seed = async (knex: Knex): Promise<any> => {
  // Deletes ALL existing entries
  await knex('community_managers').del()
  // Inserts seed entries
  await knex('community_managers').insert([
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
}
