const path = require('path');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: './src/electron/main.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname),
    filename: 'main.js',
    // devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
      rules: [
          // Handle all .ts or .tsx files with ts-loader
          { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          // { enforce: "pre", test: /\.js$/, loader: 'source-map-loader' }
      ]
  },
  node: {
    __dirname: false
  }
};
