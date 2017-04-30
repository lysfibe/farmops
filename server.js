#! /usr/bin/env node

const Koa = require('koa')

const views = require('koa-views')
const mount = require('koa-mount')
const serve = require('koa-static')

const { web, api } = require('./routes')

const app = new Koa()

app.use(serve(__dirname + '/public', {}))

app.use(views(__dirname + '/views', {
	map: {
		'hbs': 'handlebars',
	},
	extension: 'hbs',
}))

app.use(async (ctx, next) => {
	await next()
	if (ctx.body == null) {
		ctx.status = 404
	}
})

app.use(web.routes())
app.use(web.allowedMethods())

app.use(api.routes())
app.use(api.allowedMethods())

app.listen(5000, function() {
	console.log('FoodOps running at http://localhost:5000')
})
