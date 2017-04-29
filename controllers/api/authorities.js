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

const defaults = {
	consumption: 0.2,
	provision: 0.8,
}

const pluck = (obj, props) => props.map(prop => [prop, obj[prop]]).reduce((acc, [key, value]) => Object.assign(acc, { [key]: value }), {})

function serialise({ population, farmland }, params = {}) {
	const parameters = Object.assign({}, defaults, params)
	const required = parameters.consumption * population
	const deficit = required - farmland
	const containers = deficit / parameters.provision

	return {
		population,
		farmland,
		required,
		deficit,
		containers,
	}
}

const data = require('../../data/counties.json')

/**
 * This function will eventually be provided by Dave's data stuff
 */
async function getData(name = null, opts = {}) {
	if (name) {
		const datum = data[name]
		if (datum == null) return null
		return serialise(datum)
	} else {
		return Object.entries(data)
			.map(([key, value]) => [key, serialise(value)])
			.reduce((acc, [key, value]) => Object.assign({}, acc, { [key]: value }), {})
	}
}

exports.list = async ctx => {
	ctx.body = await getData(ctx.query.name, pluck(ctx.query, ['consumption', 'provision']))
}

exports.read = async ctx => {
	ctx.body = await getData(ctx.params.name, pluck(ctx.query, ['consumption', 'provision']))
}