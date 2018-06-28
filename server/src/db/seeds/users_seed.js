exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          country_code: '1',
          phone_number: '123456789',
          email: 'user@example.com',
          email_activated: true,
          display_name: 'Example User',
          profile_image: 'https://api.adorable.io/avatars/300/0@adorable.png',
        },
        {
          country_code: '1',
          phone_number: '234567891',
          email: 'user_email_unactivated@example.com',
          email_activated: false,
          display_name: 'Example User (Unactivated)',
          profile_image: 'https://api.adorable.io/avatars/300/1@adorable.png',
        },
        {
          country_code: '66',
          phone_number: '623385559',
          email: 'paul@bandprotocol.com',
          email_activated: true,
          display_name: 'Paul Chonpimai',
          profile_image:
            'https://avatars0.githubusercontent.com/u/891585?s=460&v=4',
        },
      ])
    })
}
