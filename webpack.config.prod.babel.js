'use strict'

import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const ExtractLocal = new ExtractTextPlugin({filename: 'stylesheets/stylesLocal.css', disable: false, allChunks: true})
const ExtractGlobal = new ExtractTextPlugin({filename: 'stylesheets/stylesGlobal.css', disable: false, allChunks: true})
const publicPath = path.resolve(__dirname, './src/client')
const buildPath = path.resolve(__dirname, './src')

module.exports = {
  devtool: '#source-maps',
  performance: {
    hints: false
  },
  context: publicPath,
  entry: {
    bundle: [
      'script-loader!jquery/dist/jquery.min.js',
      'script-loader!tether/dist/js/tether.min.js',
      'script-loader!bootstrap/dist/js/bootstrap.min.js',
      './app.js'
    ]
  },
  output: {
    path: path.join(buildPath, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      apiCall: path.resolve(__dirname, 'src/client/api/apiCall.jsx'),
      DisplayComponent: path.resolve(__dirname, 'src/client/scenes/home/components/DisplayComponent.jsx'),
      SearchComponent: path.resolve(__dirname, 'src/client/scenes/home/components/SearchComponent.jsx'),
      Home: path.resolve(__dirname, 'src/client/scenes/home/index.jsx'),
      Navigation: path.resolve(__dirname, 'src/client/scenes/shared/navigation/index.jsx'),
      Container: path.resolve(__dirname, 'src/client/scenes/Container.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|dist/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-runtime',
            [
              'babel-plugin-react-css-modules',
              {
                context: publicPath,
                filetypes: {
                  '.scss': 'postcss-scss'
                }
              }
            ]
          ],
          babelrc: false,
          presets: [
            'react',
            ['es2015', { 'modules': false }],
            'stage-0'
          ]
        }
      },
      {
        test: /\.local\.(css|scss)$/,
        use: ExtractLocal.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: path.resolve(__dirname, './src/client/styles/global/sass-resources.scss')
              }
            }
          ]
        })
      },
      {
        test: /^((?!\.local).)+\.(css|scss)$/,
        use: ExtractGlobal.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    ExtractLocal,
    ExtractGlobal,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
