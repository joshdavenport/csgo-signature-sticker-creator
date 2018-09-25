var path = require('path'),
    webpack = require('webpack');

module.exports = {
	entry: [
		"webpack-dev-server/client?http://localhost:8181/",
		"./src/index.js"
	],
	output: {
		path: path.resolve(__dirname, "public"),
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
		rules: [
			{
		        test: /\.scss$/,
		        include: /src/,
		        use: [
		            {
	            		loader: 'style-loader'
	            	},
		            {
		            	loader: 'css-loader'
		            },
		            {
		            	loader: 'postcss-loader',
		            	options: {
		            		plugins: function () {
		            			return [
		            				require('autoprefixer')
		            			];
		            		}
		            	}
		            },
		            {
		            	loader: 'sass-loader'
		            }
		        ]
		    },
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{ 
				test: /\.(woff2?|ttf|eot|svg)$/, 
				use: 'url?limit=10000'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
	        jQuery: 'jquery',
	        $: 'jquery',
	        'window.jQuery': 'jquery',
	    })
	]
};
