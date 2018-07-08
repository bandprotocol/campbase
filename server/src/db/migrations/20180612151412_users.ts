import * as Knex from 'knex'

exports.up = async function(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.unique(['country_code', 'phone_number'])
    table.string('country_code').notNullable()
    table.string('phone_number').notNullable()
    table.string('email').unique()
    table.boolean('email_activated').defaultTo(false)
    table.string('display_name').notNullable()
    table.string('profile_image').notNullable()
  })
}

exports.down = async function(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users')
}
