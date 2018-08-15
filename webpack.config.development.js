const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 3402;

module.exports = {
  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'src/Html'),
    historyApiFallback: true,
    hot: true,
    port: port,
  },

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:' + port + '/',
      path.join(__dirname, 'src/app.development'),
    ],
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.css\.js$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
            },
          },
          'postcss-loader',
          'compile-string-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
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

  optimization: {
    noEmitOnErrors: true,
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/static'),
    publicPath: '/static/',
  },

  plugins: [new ErrorOverlayPlugin(), new webpack.HotModuleReplacementPlugin()],

  resolve: {
    extensions: ['.js'],
  },
};
