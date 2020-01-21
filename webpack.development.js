const path = require('path');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: './src/electron/main.ts',
  devtool: 'source-map',
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
          },
      ]
  },
  node: {
    __dirname: false
  }
};
