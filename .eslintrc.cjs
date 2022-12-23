module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ["react-app", "plugin:prettier/recommended"],
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
