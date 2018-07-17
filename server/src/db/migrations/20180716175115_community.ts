import * as Knex from 'knex'

exports.up = async function(knex: Knex): Promise<any> {
  return knex.schema.createTable('community_managers', table => {
    table.increments('id').primary()
    table
      .string('username')
      .notNullable()
      .unique()
    table
      .string('email')
      .notNullable()
      .unique()
    table.string('password_hash').notNullable()
    table.boolean('email_activated').defaultTo(false)
  })
}

exports.down = async function(knex: Knex): Promise<any> {
  return knex.schema.dropTable('community_managers')
}
