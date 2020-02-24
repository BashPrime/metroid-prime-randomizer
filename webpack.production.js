const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'electron-main',
  entry: './src/electron/main.ts',
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
      rules: [
          // Handle all .ts or .tsx files with ts-loader
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
      ]
  },
  node: {
    __dirname: false
  }
};
