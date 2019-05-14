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
      enableInSFC: false
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
      .set('@api', resolve('api'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@config', resolve('src/config'))
      // .set('@firebase', resolve('src/firebase'))
      .set('@locales', resolve('src/locales'))
      .set('@pages', resolve('src/pages'))
      .set('@setup', resolve('src/setup'))
      .set('@store', resolve('src/store'))
      .set('@modules', resolve('src/store/modules'))
      .set('@utils', resolve('src/utils'))
  }
}

// extensions: ['.js', '.jsx', '.vue', '.css', '.png', '.jpg', '.gif', '.jpeg']
