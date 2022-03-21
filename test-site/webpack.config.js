const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const babelOptions = {
  presets: [['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3, targets: {ie: 11} }]],
};

module.exports = [{
  entry: './src/index.ts',
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'babel-loader', options: babelOptions },
          { loader: 'ts-loader' }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html' },
      ],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'TestSite',
      type: 'window'
    },
    environment: {
      arrowFunction: false
    },
  },
  optimization: {
    minimize: false
  },
}];