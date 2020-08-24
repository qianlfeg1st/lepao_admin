const {
  override,
  fixBabelImports,
  useEslintRc,
  addWebpackAlias,
} = require('customize-cra')

const path = require('path')

module.exports = override(

  // 使用eslint
  useEslintRc('.eslintrc.js'),

  // 按需加载antd配置
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),

  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components'),
    page: path.resolve(__dirname, 'src/page')
  }),

)
