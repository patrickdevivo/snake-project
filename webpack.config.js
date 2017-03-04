var path = require('path');

module.exports = {
	entry: './app/index.js',
	devtool: "cheap-eval-source-map",
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	}
};