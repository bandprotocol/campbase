import * as Koa from 'koa'
import { useRoutes } from './route/api'
import { useValidateMethods } from '~/route/middlewares/validate-methods'
import { useAuthentication } from '~/route/middlewares/authentication'
import { useSuccessFailMethods } from '~/route/middlewares/success-fail-methods'
import { PORT } from './config'

const app = new Koa()

useSuccessFailMethods(app)
useAuthentication(app)
useValidateMethods(app)
useRoutes(app)

// Start server
const server = app.listen(PORT)
console.log(`CAMPBASE server listening on port: ${PORT}`)

// Export for test
export default server
