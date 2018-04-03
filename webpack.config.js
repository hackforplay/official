const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FeelesWebpackPlugin = require('./feeles-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const cdn = 'https://assets.feeles.com/public/v1152/h4p.js';
// const cdn = 'http://localhost:8081/h4p.js';
const port = process.env.PORT || 8083;
const dist = 'public/';

module.exports = {
	entry: './entry.js',
	output: {
		path: path.resolve(dist),
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.(html|hbs)$/,
			loaders: ['handlebars-loader']
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: './megaman-proto/index.html',
			template: './megaman-proto/template.hbs',
			cdn
		}),
		new FeelesWebpackPlugin({
			paths: ['./megaman-proto/src'],
			output: 'index.json',
			ignore: /\.DS_Store$/
		}),

		// https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b
		new webpack.optimize.ModuleConcatenationPlugin(),

		new OpenBrowserPlugin({
			url: `http://localhost:${port}/megaman-proto`
		}),

		// Cache and proxy this whole site
		new OfflinePlugin()
	],
	devServer: {
		contentBase: dist,
		port,
		// https://github.com/webpack/webpack-dev-server/issues/882
		// ngrok で https のテストをするとき "Invalid Host header" になるので.
		disableHostCheck: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*'
		}
	}
};
