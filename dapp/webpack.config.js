const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpack = require('webpack')
const config = require('config')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'assets'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    port: process.env.COMMUNITY_COLU_PORT || 9000,
    historyApiFallback: true,
    allowedHosts: [
      '.ngrok.io'
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: process.env.NODE_ENV === 'development' ? './src/index.dev.html' : './src/index.html',
      filename: './index.html'
    }),
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(config) }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader']
      }
    ]
  }
}
