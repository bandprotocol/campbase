import * as Knex from 'knex'

exports.up = async function(knex: Knex): Promise<any> {
  return knex.schema.createTable('community_manager', table => {
    table.increments('id').primary()
    table.string('email').notNullable()
    table.string('username').notNullable()
    table.string('password_hash').notNullable()
    table.string('password_salt').notNullable()
  })
}

exports.down = async function(knex: Knex): Promise<any> {
  return knex.schema.dropTable('community_manager')
}
