'use strict'

const path = require('path')

module.exports = {
  dev: {
    //env: require('./dev.env'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/system',
    proxyTable: {
      "/": {
        // target: "http://132.232.30.39:8000",
        target: "http://127.0.0.1:8000",
        logLevel: 'debug',
        changeOrigin: true
      }
    },

    // if you want dev by ip, please set host: '0.0.0.0'
    host: '0.0.0.0',
    port: 11001,
    assetsPublicPath: '/',
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,

    // Use Eslint Loader?
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-source-map',

    // Source Maps
    cssSourceMap: false
  },

  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',

    // assetsPublicPath: '/system',
    assetsPublicPath: '/',
    productionSourceMap: false,

    // Source Maps
    devtool: 'source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report || false,
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
