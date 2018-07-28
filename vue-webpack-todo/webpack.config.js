const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HtmlWebpackPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true, // 使用前面的处理器生成的sourceMap，提高编译效率
        }
      },
      'stylus-loader'
    ]
  })
  // https://webpack.js.org/configuration/devtool/
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    // historyFallback: {},
    // open: true,
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue'] // 区分打包类库
  }
  config.output.filename = '[name].[chunkhash:8].js' // chunkhash 每个chunk单独生成一个hash
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      })
    },
  )
  config.plugins.push(
    new ExtractTextPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // webpack相关代码单独打包，
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config
