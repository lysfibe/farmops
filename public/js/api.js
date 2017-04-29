window.api = window.api || {}
(function() {
	const qs = obj => {
		let str = '?'
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const value = obj[key]
				if (Array.isArray(value)) {
					str += value.map(val => `${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`).join('&')
				} else {
					str += encodeURIComponent(key) + '=' + encodeURIComponent(value)
				}
			}
		}
		return str
	}
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
	api.authority = function getAuthorities(name, params) {
		name = name || ''
		return fetch('/api/authorities/' + name + qs(params))
			.then(r => r.json())
	}
}())
