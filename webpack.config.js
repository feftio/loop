const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: 8000,
    open: true 
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Loop',
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  }
}