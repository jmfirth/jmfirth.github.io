var webpack = require('webpack')
var config = require('./webpack.config.base')

// add good price/perf source maps
config.devtool = '#cheap-module-eval-source-map'

// resolve window.fetch polyfill
config.resolve.alias = { fetch: 'whatwg-fetch' }

// development asset virtual path
config.output.publicPath = '/scripts/'

// development plugins
config.plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  })
]

module.exports = config
