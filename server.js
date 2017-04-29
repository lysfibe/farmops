const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const web = new Router()
const api = new Router({ prefix: '/api' })

const controller = (name, method) => require(`./controllers/${name}`)[method]

web.get('/', (ctx) => {
	ctx.response.body = 'Hello world'
})

api.get('/', controller('api/example', 'index'))

app.use(web.routes())
app.use(web.allowedMethods())
app.use(api.routes())
app.use(api.allowedMethods())

app.listen(5000)