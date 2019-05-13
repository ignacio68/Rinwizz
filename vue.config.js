// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//  .BundleAnalyzerPlugin

module.exports = {
  publicPath: '',
  pluginOptions: {
    cordovaPath: 'src-cordova',
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin()
    ],
    resolve: {
      alias: require('./aliases.config').webpack
    }
  }
  // extensions: ['.js', '.jsx', '.vue', '.css', '.png', '.jpg', '.gif', '.jpeg']
}
