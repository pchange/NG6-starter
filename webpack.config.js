var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = './client/';
module.exports = {
  devtool: 'sourcemap',
  entry: {
    app:[
      'webpack-dev-server/client?http://127.0.0.1:3000',
      'webpack/hot/only-dev-server',
      srcPath + 'app/app.js',
    ],
    login:[
      'webpack-dev-server/client?http://127.0.0.1:3000',
      'webpack/hot/only-dev-server',
      srcPath + 'login/login.js',
    ],
  },
  output: {
    path: path.join(__dirname, "./dist/"),
    publicPath: "http://127.0.0.1:3000/dist/static/view/",
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js'
  },
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.styl$/, loader: 'style!css!stylus' },
       { test: /\.scss$/, loader: 'style!css!scss' },
       { test: /\.css$/, loader: 'style!css' }
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      filename: 'index.html',
      title: '智慧青少宫综合业务管理平台',
      excludeChunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      template: 'client/login.html',
      inject: 'body',
      filename: 'login.html',
      title: '请登录 - 智慧青少宫综合业务管理平台',
      excludeChunks: ['app'],
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
