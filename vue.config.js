const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  publicPath: '',
  pluginOptions: {
    cordovaPath: 'src-cordova',
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  }
}
