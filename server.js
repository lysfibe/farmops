const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
	ctx.response.body = 'Hello world'
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(5000)