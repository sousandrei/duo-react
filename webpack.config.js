const webpack = require('webpack')
const { normalize } = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = env => {
	
	process.env.NODE_ENV = env || 'development'
	
	switch (process.env.NODE_ENV) {
		case 'test':
			require('dotenv').config({ path: '.env/.test' })
			break
		case 'production':
			require('dotenv').config({ path: '.env/.production' })
			break
		default:
			require('dotenv').config({ path: '.env/.development' })
			break
	}
	
	const isProduction = env == 'production'
	const CSSExtract = new ExtractTextWebpackPlugin('styles.css')

	return {
		entry: ['babel-polyfill', './src/app.js'],
		output: {
			path: normalize(`${__dirname}/public/dist`),
			filename: 'bundle.js'
		},
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}, {
				test: /\.s?css$/,
				use: CSSExtract.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						},
					]
				})
			}]
		},
		plugins: [
			CSSExtract,
			new webpack.DefinePlugin({
				'process.env.DASHBOARD': JSON.stringify(process.env.DASHBOARD),
			}),
			// new webpack.HotModuleReplacementPlugin()
		],
		devtool: isProduction ? undefined : 'inline-source-map',
		devServer: {
			// hot: true,
			// inline: true,
			host: '0.0.0.0',
			contentBase: normalize(`${__dirname}/public`),
			historyApiFallback: true,
			publicPath: '/dist/'
		}
	}
}
