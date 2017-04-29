const Koa = require('koa')
const views = require('koa-views')
const { web, api } = require('./routes')

const app = new Koa()

app.use(views(__dirname + '/views', {
	map: {
		'hbs': 'handlebars',
	},
	extension: 'hbs',
}))

app.use(web.routes())
app.use(web.allowedMethods())

app.use(api.routes())
app.use(api.allowedMethods())

app.listen(5000)