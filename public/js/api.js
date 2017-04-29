window.api = window.api || {}

/*
 * {
 *   name: {
 *		 population: 1000,
 *		 deficit: 5000,
 *		 containers: 40,
 *		 farmland: 1230,
 *   }
 * }
 */
api.authority = function getAuthorities(name) {
	name = name || ''
	return fetch('/api/authorities/' + name)
		.then(r => r.json())
}