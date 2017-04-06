const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

process.noDeprecation = true 

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
	},
	module: {
		loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
		]
	},
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: true }
    }),
  ]
}
