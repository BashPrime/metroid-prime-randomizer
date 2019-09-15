const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/electron/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'electron.js'
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
  },
  externals: [ nodeExternals() ]
};
