var webpack =require('webpack');


module.exports={
//入口文件
	entry: './public/js/initApp.js'
    ,
    output:{
       path:'build',
       filename:'bundle.js',
       chunkFilename:'[id].bundle.js',
  //     publicPath:'http://localhost:8099/'
    },
    /*该插件如何定义，$,jQuery,'window.jQuery','window.$'？？？*/
    plugins:[
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          'window.$': 'jquery',
      }),


        /* 抽取出所有通用的部分 */
        /*
        new webpack.optimize.CommonsChunkPlugin({
      name: 'commons/commons',      // 需要注意的是，chunk的name不能相同！！！
      filename: '[name]/bundle.js',
      minChunks: 2,
      }),
      */

      /* 抽取出css */
//      new ExtractTextPlugin('/static/css/[name]-[hash].css'),
    ],
    module:{
    loaders:[
       {
         test: /\.css$/,
           /*style!css中间的！是什么意思？？？*/
		     loader: 'style!css',
//			   loader: ExtractTextPlugin.extract("style-loader", "css-loader")
       },
			 {
			         test: /\.js$/,
			         exclude: /node_modules/,
			         loader: 'babel',/*在webpack的module部分的loaders里进行配置即可，babel模块在哪里引入的？？？*/
			         /*该属性什么作用？？？*/
                     query: {
			           presets: ['es2015']
			         }
			 },
       {
      // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
      // 如下配置，将小于8192byte的图片转成base64码
          test: /\.(png|jpg|gif)$/,
           /*该正则表达式的含义？？？*/
          loader: 'url?limit=8192&name=./static/img/[hash].[ext]',
       },
      //front
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=static/fonts/[hash].[ext]" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000&name=static/fonts/[hash].[ext]" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=static/fonts/[hash].[ext]" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=static/fonts/[hash].[ext]" },
    ]
    },

    resolve:{
    	alias:{
    	 'jquery' : __dirname + "/node_modules/jquery/dist/jquery",
            'jquery-ui': __dirname + "/node_modules/jquery-ui-dist/jquery-ui.js",
            'jquery-ui.css': __dirname + "/node_modules/jquery-ui-dist/jquery-ui.css",
        'bootstrap.css' : __dirname+ "/node_modules/bootstrap/dist/css/bootstrap.min.css",
        'bootstrap.js' : __dirname+ "/node_modules/bootstrap/dist/js/bootstrap.min.js"
        },
    	extentions: ['', 'js']
    }
}
