const { map } = require('ramda')

const prod = require('./webpack.prod')
const { commonLoaders, styleLoader } = require('./webpack.common')

const { EnvironmentPlugin } = require('webpack')

module.exports = {
	...prod,
	entry: map((entry) => ['whatwg-fetch', entry], prod.entry),
	output: {
		filename: '[name].legacy.bundle.js',
	},
	module: {
		rules: [...commonLoaders({ legacy: true }), styleLoader('style-loader')],
	},
	plugins: [
		new EnvironmentPlugin({
			GITHUB_REF: '',
			GITHUB_HEAD_REF: '',
			GITHUB_SHA: '',
		}),
		new EnvironmentPlugin({
			EN_BASE_URL: 'http://localhost:8080/infrance',
			FR_BASE_URL: 'http://localhost:8080/mon-entreprise',
		}),
	],
}
