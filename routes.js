const Router = require('koa-router')

const web = new Router()
const api = new Router({ prefix: '/api' })

const controller = (name, method) => require(`./controllers/${name}`)[method]

web.get('/', async (ctx) => {
	await ctx.render('index')
})

// api.get('/', controller('api/example', 'index'))

exports.web = web
exports.api = api
