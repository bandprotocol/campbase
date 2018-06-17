import * as Koa from 'koa'
import { useRoutes, useAuthentication, useCustomException } from './routes'
import { PORT } from './config'

const app = new Koa()

useCustomException(app)
useAuthentication(app)
useRoutes(app)

// Start server
const server = app.listen(PORT)
console.log(`CAMPBASE server listening on port: ${PORT}`)

// Export for test
export default server
