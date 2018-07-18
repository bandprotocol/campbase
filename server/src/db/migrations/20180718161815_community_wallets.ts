import * as Knex from 'knex'

exports.up = async function(knex: Knex): Promise<any> {
  await knex.schema.createTable('community_wallets', table => {
    table.string('address').primary()
    table.string('sk').notNullable()
    table.string('vk').notNullable()
  })

  // Associate wallet with community
  await knex.schema.table('communities', table => {
    table.string('wallet_address').notNullable()

    table
      .foreign('wallet_address')
      .references('address')
      .inTable('community_wallets')
  })
}

exports.down = async function(knex: Knex): Promise<any> {
  await knex.schema.table('communities', table => {
    table.dropForeign(['wallet_address'])
    table.dropColumn('wallet_address')
  })
  await knex.schema.dropTable('community_wallets')
}
