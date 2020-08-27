const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: 'web',

	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss'],
	},

	entry: {
		// vendor js
		react: ['react', 'react-dom', 'react-router'],
		lodash: ['lodash'],

		// css
		fonts: './src/styles/vendor/fonts.scss',
		global: './src/styles/global/scss',

		// app js
		app: './src/index.tsx',
	},

	output: {
		publicPath: '/',
	},

	module: {
		rules: [
			// Typescript & Javascript
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader'],
			},

			// Styles
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},

			// Eslint
			{
				enforce: 'pre',
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: ['eslint-loader'],
			},

			// Files
			{
				test: /\.(png|jpg|zip)$/,
				use: ['file-loader'],
			},
		],
	},

	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Productivity Tracker',
			template: require('html-webpack-template'),
			appMountId: 'app',
		}),
	],
};
