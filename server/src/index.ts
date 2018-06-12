import * as Koa from 'koa'
import router from './router'

const app = new Koa()

app.use(router.routes())

const PORT = process.env.PORT || 5000
app.listen(PORT)

console.log(`CAMPBASE server listening on port: ${PORT}`)
