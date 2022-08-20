const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    renderer: './src/renderer/index.tsx',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html',
      output: 'index.html',
      chunks: ['renderer'],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'out', 'renderer'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'swc-loader',
          options: {
            module: {
              type: 'es6',
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
  },
};
