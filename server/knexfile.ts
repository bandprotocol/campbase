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

  prod: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      database: process.env.MYSQL_DATABASE || 'campbase_api_prod',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    // Prod doesn't need seed
  },
}
