const path = require('path');
const webpack = require('webpack');
const externals = require('webpack-node-externals');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/app.static'),
  },

  externals: externals(),

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              localIdentName: '[hash:base64:5]',
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },

      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  node: {
    __dirname: true,
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'bin'),
  },

  resolve: {
    extensions: ['.js'],
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'src/loaders')],
  },

  target: 'node',
};
