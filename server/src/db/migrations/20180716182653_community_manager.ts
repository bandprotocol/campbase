import * as Knex from 'knex'

exports.up = async function(knex: Knex): Promise<any> {
  return knex.schema.createTable('communities', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('symbol').notNullable()
    table.string('profile_image').notNullable()

    table.string('contract_address').notNullable()
    table.string('business_name').notNullable()
    table.string('business_address').notNullable()
    table.string('business_country').notNullable()
    table.string('business_zipcode').notNullable()
    table.string('business_phone_number').notNullable()

    table
      .integer('community_manager_id')
      .unsigned()
      .notNullable()

    table
      .foreign('community_manager_id')
      .references('id')
      .inTable('community_managers')
  })
}

exports.down = async function(knex: Knex): Promise<any> {
  return knex.schema.dropTable('communities')
}
