// setting the correct path. always put this line here
const path = require('path');

const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  // shows original source
  devtool: 'eval-source-map',
  output: {
    // bundle-file with changing hash to prevent caching problems
    filename: '[name].bundle.js',
    // In Node.js, __dirname is always the directory in which the currently executing script resides
    // So if you type __dirname into /d1/d2/myscript.js, the value would be /d1/d2
    // This resolves to dist folder
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader', // 3. Inject style into DOM
          'css-loader', // 2. Turns css into commonjs
          'sass-loader' // 1. Turns sass into css
        ]
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // have to add this for every new html file
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index.html',
      chunks: ['home']
    })
  ]
});
