exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          country_code: '66',
          phone_number: '66623385559',
          email: 'paul@bandprotocol.com',
          // plain_password = 'password'
          password_hash:
            ' $2b$10$bLB9lm4G5vk3Hu2eVB3fdeMMEql6Wij.Oav2ZnrhgJWU6/GJPXaUC',
          email_activated: true,
          display_name: 'Paul Chonpimai',
          profile_image:
            'https://avatars0.githubusercontent.com/u/891585?s=460&v=4',
        },
      ])
    })
}
