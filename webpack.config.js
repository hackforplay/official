const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FeelesWebpackPlugin = require('feeles-ide/lib/feeles-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = loadConfig();
const port = process.env.PORT || config.port;
const dist = 'public/';

/**
 * Feeles で使える環境変数. これらの文字を "文字列としてリプレイス" する (import のロード先にも使える)
 * process.env.__FEELES_COMMON_REGISTER__: @hackforplay/common の register.js
 * process.env.__FEELES_COMMON_INDEX__: @hackforplay/common の index.js
 * process.env.__FEELES_NODE_ENV__: process.env.NODE_ENV
 */
if (!process.env.NODE_ENV) {
	// 開発用
	process.env.__FEELES_NODE_ENV__ = `'development'`;
	process.env.__FEELES_COMMON_REGISTER__ = 'http://localhost:8080/register.js'
	process.env.__FEELES_COMMON_INDEX__ = 'http://localhost:8080/main.js'
} else {
	// 本番デプロイ用
	process.env.__FEELES_NODE_ENV__ = JSON.stringify(process.env.NODE_ENV);
	if (!process.env.__FEELES_COMMON_REGISTER__)
		throw new Error('process.env.__FEELES_COMMON_REGISTER__ is not set');
	if (!process.env.__FEELES_COMMON_INDEX__)
		throw new Error('process.env.__FEELES_COMMON_INDEX__ is not set');
}


module.exports = {
	mode: process.env.NODE_ENV || 'development',

	entry: './entry.js',
	output: {
		path: path.resolve(dist),
		filename: '[name].js'
	},
	module: {
		rules: [{
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
			paths: [`${dir}`],
			output: `${dir}/index.json`,
			ignore: /\.DS_Store$/
		})),

		new webpack.DefinePlugin({
			FEELES_OFFILE_MODE: config.offline
		}),

		// https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b
		new webpack.optimize.ModuleConcatenationPlugin()
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

function loadConfig() {
	if (process.env.NODE_ENV === 'production') {
		return require('./config.prod');
	}
	try {
		return require('./config.dev');
	} catch (error) {}
	try {
		const fs = require('fs');
		fs.copyFileSync('./config.prod.js', './config.dev.js', fs.constants.COPYFILE_EXCL);
	} catch (error) {}
	return require('./config.prod');
}
