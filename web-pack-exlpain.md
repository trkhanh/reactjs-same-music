## Webpack as configure manager

> Single of truths is a good pattern. Chief of Configurate even better (CTO)

webpack.config.js as **Provider** (CTO)
```js

module.export = {
 /**
 * Things CEO will entry to CTO to handle
 */
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  /**
  * Things CTO will export out side all Repo
  */
 externals: {
    config: JSON.stringify(require('./config.json'))
  },
  
   node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  
  /**
  * CTO rules set
  */
  
  // will go to make sure all file *.js|jsx exclude node_module with babel  which loaded by babel-loader.
  // will go to make sure all file *.css with style check by loader etc..
  // will go to make sure all file *.png|jpg|PNG|svg must be limit under 8912kb by url-loader?limit=8192
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: [
            'style-loader?sourceMap',
            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.(png|jpg|PNG|svg)$/, 
        loaders: ['url-loader?limit=8192']
      }
    ]
  },
}
/**
* Things CTO will resolve with marked by 
*/
resolve: {
	extensions: ['*','.js','.jsx']
},

/**
* Place the result of CTO will put base on CEO strategy you will assign where CTO should handler his output
*/
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
 
 /**
 * Tool support for CTO
 /*
 plugins: [
  new webpack.HotModuleReplacementPlugin()
 ],
 /*
 * CTO setup for DEV enviroment
 */
  devServer: {
    contentBase: './dist',
    hot: true
  }
	
```

index.js as **Consumer** 
```js
import config from 'config' 
class Example {
	constructor(){
		this.config = config.apiRoot
	}
}

```

package.json as **runtime API**
```json
...
"script":{
	start": "webpack-dev-server --progress --colors --config ./webpack.config.js",
},
...
```
config.js as **configurate as code** 
>no need export anymore bingo!!
```js
{
    "apiRoot": "http://localhost:8000"
}
```