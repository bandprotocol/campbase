import * as Koa from 'koa'
import * as Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/*', async ctx => {
  ctx.body = 'Hello Band Protocol'
})

app.use(router.routes())

const PORT = 5000
app.listen(PORT)

console.log(`App listening on port ${PORT}`)
