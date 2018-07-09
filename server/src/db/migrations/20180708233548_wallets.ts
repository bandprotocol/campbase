import * as Knex from 'knex'

exports.up = async function(knex: Knex): Promise<any> {
  return knex.schema.createTable('wallets', table => {
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
    table
      .string('address')
      .notNullable()
      .primary()
    table.string('encrypted_key').notNullable()

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
  })
}

exports.down = async function(knex: Knex): Promise<any> {
  return knex.schema.dropTable('wallets')
}
