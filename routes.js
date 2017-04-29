const Router = require('koa-router')

const web = new Router()
const api = new Router({ prefix: '/api' })

const controller = (name, method) => require(`./controllers/${name}`)[method]

web.get('/', async (ctx) => {
	await ctx.render('test')
})

api.get('/', controller('api/example', 'index'))

api.get('/authorities', controller('api/authorities', 'list'))
api.get('/authorities/:name', controller('api/authorities', 'read'))

exports.web = web
exports.api = api