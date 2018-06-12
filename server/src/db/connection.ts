import * as Knex from 'knex'

const environment = process.env.NODE_ENV || 'dev'
const config = require('../../knexfile')[environment]

const connection: Knex = Knex(config)

export default connection
