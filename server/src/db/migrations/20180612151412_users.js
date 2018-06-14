exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.unique(['country_code', 'phone_number'])
    table.string('country_code').notNullable()
    table.string('phone_number').notNullable()
    table.string('email').unique()
    table.string('password_hash').notNullable()
    table.boolean('email_activated').defaultTo(false)
    table.string('display_name').notNullable()
    table.string('profile_image').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
