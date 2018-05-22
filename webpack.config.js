const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FeelesWebpackPlugin = require('./feeles-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const config = process.env.NODE_ENV === 'production' ? require('./config.prod') : require('./config.dev');

const port = process.env.PORT || config.port;
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
		...config.source.map(dir => new HtmlWebpackPlugin({
			filename: `${dir}/index.html`,
			template: `./template.hbs`,
			inject: `body`
		})),

		...config.source.map(dir => new FeelesWebpackPlugin({
			paths: [`${dir}`, `./common`],
			output: `${dir}/index.json`,
			ignore: /\.DS_Store$/
		})),

		new webpack.DefinePlugin({
			FEELES_OFFILE_MODE: config.offline
		}),

		// https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b
		new webpack.optimize.ModuleConcatenationPlugin(),

		// Cache and proxy this whole site
		new OfflinePlugin()
	].concat(
		process.env.HEROKU ? [] : (
			new OpenBrowserPlugin({
				url: `http://localhost:${port}/make-rpg/`
			})
		)
	),
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
