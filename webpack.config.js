const path = require('path');

module.exports = {
  mode: 'production',
  target: 'electron-main',
  entry: './src/electron/main.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
      rules: [
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
