const EXAMPLE_DATA = {
	foo: {
		population: 1000,
		deficit: 5000,
		containers: 40,
		farmland: 1230,
	},
	bar: {
		population: 1000,
		deficit: 5000,
		containers: 40,
		farmland: 1230,
	},
}

/**
 * This function will eventually be provided by Dave's data stuff
 */
async function getData(name = null) {
	return name ? EXAMPLE_DATA[name] : EXAMPLE_DATA
}

exports.list = async ctx => {
	ctx.body = await getData(ctx.query.name)
}

exports.read = async ctx => {
	ctx.body = await getData(ctx.params.name)
}