// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//  .BundleAnalyzerPlugin
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  pluginOptions: {
    cordovaPath: 'src-cordova',
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin()
    ] /* ,
    resolve: {
      alias: require('./aliases.config').webpack
    } */
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('.'))
      .set('@src', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@locales', resolve('src/locales'))
      .set('@mixins', resolve('src/mixins'))
      .set('@pages', resolve('src/pages'))
      .set('@services', resolve('src/services'))
      .set('@setup', resolve('src/setup'))
      .set('@store', resolve('src/store'))
      .set('@modules', resolve('src/store/modules'))
      .set('@utils', resolve('src/utils'))
  }
}

// extensions: ['.js', '.jsx', '.vue', '.css', '.png', '.jpg', '.gif', '.jpeg']
