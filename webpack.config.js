const path = require('path');


const PATHS =  {
	entry: path.join(__dirname, 'client/src/index.js'),
	output: path.join(__dirname, 'client/public'),
	src: path.join(__dirname, 'client/src')
};
const config = {
	context: __dirname,
	entry: PATHS.entry,
	output: {
		path: PATHS.output,
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'] 
	}
	module: {
		rules: [
			{
				text: /\.jsx?$/,
				loader: 'babel-loader',
				include: PATHS.src
				query: {
					presets: ["react"]
				}
			}
		]
	}
};

module.exports = config;