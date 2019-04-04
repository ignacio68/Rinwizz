const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@firebase': path.resolve(__dirname, 'src/firebase'),
      '@locales': path.resolve(__dirname, 'src/locales'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@modules': path.resolve(__dirname, 'src/store/modules')
    },
    extensions: ['.js', '.jsx', '.vue', '.css', '.png', '.jpg', '.gif', '.jpeg']
  }
}
