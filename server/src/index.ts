import * as Koa from 'koa'
import * as KoaBodyparser from 'koa-bodyparser'
import { useRoutes, useAuthentication } from './routes'
import { PORT } from './config'

const app = new Koa()

app.use(KoaBodyparser())
useRoutes(app)
//useAuthentication(app)

app.listen(PORT)
console.log(`CAMPBASE server listening on port: ${PORT}`)
