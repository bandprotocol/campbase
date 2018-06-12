exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table
      .string('phone_number')
      .notNullable()
      .primary()
    table.string('email').unique()
    table.string('password_hash').notNullable()
    table.boolean('activated').defaultTo(false)
    table.string('display_name').notNullable()
    table.string('profile_image').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
