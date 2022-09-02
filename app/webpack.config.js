const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    filename: '[name].js',
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
              ignoreDynamic: true,
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor1: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor1',
          chunks: 'all',
          priority: 3,
        },
        vendor2: {
          test: /[\\/]node_modules[\\/]@mui[\\/]material[\\/]/,
          name: 'vendor2',
          chunks: 'all',
          priority: 2,
        },
      },
    },
  },
};
