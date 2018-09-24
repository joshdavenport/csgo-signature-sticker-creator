var path = require('path'),
    webpack = require('webpack');

module.exports = {
	entry: [
		"webpack-dev-server/client?http://localhost:8181/",
		"bootstrap-loader",
		"./src/index.js"
	],
	output: {
		path: path.resolve(__dirname, "public"),
		//publicPath: 'http://localhost:8080'
		publicPath: "/assets/",
		filename: "bundle.js"
	},
	devtool: 'eval',
	devServer: {
		contentBase: "./public",
		hot: true,
		inline: true
	},
	module: {
		loaders: [
			{
		        test: /\.scss$/,
		        include: /src/,
		        loaders: [
		            'style',
		            'css',
		            'autoprefixer?browsers=last 3 versions',
		            'sass?outputStyle=expanded'
		        ]
		    },
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
       			}
			},
			{ 
				test: /\.(woff2?|ttf|eot|svg)$/, 
				loader: 'url?limit=10000'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
	        jQuery: 'jquery',
	        $: 'jquery',
	        jquery: 'jquery'
	    })
	]
};
