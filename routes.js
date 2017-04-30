const Router = require('koa-router')

const web = new Router()
const api = new Router({ prefix: '/api' })

const controller = (name, method) => require(`./controllers/${name}`)[method]

web.get('/', async (ctx) => {
	await ctx.render('index')
})

// api.get('/', controller('api/example', 'index'))

api.get('/localities', controller('api/localities', 'list'))
api.get('/localities/:name', controller('api/localities', 'read'))

exports.web = web
exports.api = api
