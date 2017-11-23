const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js',
	},
	devServer: {
		hot: true,
		port: 8080,
		inline: true,
		contentBase: './dist',
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader", options: { hmr: true } },
					{ loader: "css-loader", options: { hmr: true } }
				]
			},
			{
				test: /\.(woff|woff2)$/,
				use: [
					{ loader: 'file-loader' }
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}