const path = require('path'); //引入绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入html插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入打包前清除dist目录的插件
const webpack = require('webpack'); //webpack自带模块热替换插件(hot module replacement)所以要先引入webpack

module.exports = {
	mode: 'development', //开发模式	//
	devtool: 'cheap-module-eval-source-map', //开发方便找出代码错
	entry: {
		main: './src/index.js',
		// sub: './src/index.js' //入口文件配置两个，打包后会生成两个相应文件（但前提出口也要配置）
	},
	devServer: {
		contentBase: './dist', //在dist目录下创建服务器
		open: true,
		port: 8080,
		hot: true //热替换
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/, //排除node里面的js文件处理
				loader: 'babel-loader'
			}, {
				test: /\.(png|jpg|gif)$/, //匹配jpg后缀名文件
				use: {
					loader: 'url-loader', //使用file-loaader
					options: {
						name: '[name]_[hash:5].[ext]', //配置打包后的文件名字后缀名配置
						limit: 10111 //限制超过10k的图片不合并index.js文件，而是打包生成图片文件
					}
				}
			},
			{
				test: /\.(eot|ttf|svg|woff)$/,
				use: {
					loader: 'file-loader'
				}
			},
			{
				test: /\.scss$/, //这里后缀名是scss后缀名文件
				use: [
					'style-loader', // 插入style标签
					{
						loader: 'css-loader', // 解析路径
						options: {
							importLoaders: 2 //表示从index.scss文件中加载另一个scss，也是先执行前面两个loader
						}
					},
					'sass-loader', //从下到上执行，sass-loader变成css文件处理
					'postcss-loader' //添加浏览器兼容前缀
				]
			}
		]
	},
	//插件
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html' //模板文件的路径
		}),
		new CleanWebpackPlugin(), //打包前清除dist目录下的文件
		new webpack.HotModuleReplacementPlugin() //热替换插件
	],
	//出口
	output: {
		// publicPath: 'http://cdn.com.cn', //配置引入路径后,src引入js都会带 'http://cdn.com.cn.main.js
		filename: '[name].js', //打包后的文件名字，用占位符[name]
		path: path.resolve(__dirname, 'dist') //打包文件的路径
	}
}