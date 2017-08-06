const path = require('path');
const webpack = require('webpack');

const PATHS = {
	entry: path.join(__dirname, 'client/src/index.js'),
	output: path.join(__dirname, 'client/public'),
	src: path.join(__dirname, 'client/src')
};
const config = {
	context: __dirname,
	entry: PATHS.entry,
	output: {
		path: PATHS.output,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: PATHS.src,
				exclude: /node_modules/,
				query: {
					presets: ['react']
				}
			}
		]
	},
	devServer: {
		publicPath: PATHS.output,
		hot: true,
		inline: true,
		progress: true
	},
	plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
};

module.exports = config;
