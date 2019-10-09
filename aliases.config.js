import { resolve } from 'path'
import { writeFile } from 'fs'
import { format } from 'prettier'

const aliases = {
  '@': '.',
  '@src': 'src',
  '@api': 'src/api',
  '@assets': 'src/assets',
  '@components': 'src/components',
  '@locales': 'src/locales',
  '@mixins': 'src/mixins',
  '@pages': 'src/router/pages',
  '@services': 'src/router/services',
  '@setup': 'src/setup',
  '@store': 'src/store',
  '@modules': 'src/state/modules',
  '@utils': 'src/utils'
}

export const webpack = {}
export const jest = {}
export const jsconfig = {}

for (const alias in aliases) {
  const aliasTo = aliases[alias]
  webpack[alias] = resolveSrc(aliasTo)
  const aliasHasExtension = /\.\w+$/.test(aliasTo)
  jest[`^${alias}$`] = aliasHasExtension
    ? `<rootDir>/${aliasTo}`
    : `<rootDir>/${aliasTo}/index.js`
  jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`
  jsconfig[alias + '/*'] = [aliasTo + '/*']
  jsconfig[alias] = aliasTo.includes('/index.')
    ? [aliasTo]
    : [
        aliasTo + '/index.js',
        aliasTo + '/index.json',
        aliasTo + '/index.vue',
        aliasTo + '/index.scss',
        aliasTo + '/index.css'
      ]
}

const jsconfigTemplate = require('./jsconfig.template') || {}
const jsconfigPath = resolve(__dirname, 'jsconfig.json')

writeFile(
  jsconfigPath,
  format(
    JSON.stringify({
      ...jsconfigTemplate,
      compilerOptions: {
        ...(jsconfigTemplate.compilerOptions || {}),
        paths: jsconfig
      }
    }),
    {
      ...require('./.prettierrc'),
      parser: 'json'
    }
  ),
  error => {
    if (error) {
      console.error(
        'Error while creating jsconfig.json from aliases.config.js.'
      )
      throw error
    }
  }
)

function resolveSrc(_path) {
  return resolve(__dirname, _path)
}
