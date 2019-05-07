const path = require('path'); //引入绝对路径

module.exports = {
	mode: 'development', //开发模式
	entry: {
		main: './src/index.js' //入口文件
	},
	module: {
		rules: [{
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
	output: {
		filename: 'bundle.js', //打包后的文件名字
		path: path.resolve(__dirname, 'dist') //打包文件的路径
	}
}