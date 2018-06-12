const path = require('path')

const BASE_PATH = path.join(__dirname, 'src', 'db')

module.exports = {
  dev: {
    client: 'mysql',
    connection: {
      database: 'campbase_api_dev',
      user: 'root',
      password: '',
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },

  test: {
    client: 'mysql',
    connection: {
      database: 'campbase_api_test',
      user: 'root',
      password: '',
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
}
