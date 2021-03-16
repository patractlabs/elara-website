const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

// 这里覆盖webpack配置，增加路径别名
module.exports = override(
    //路径别名
    addWebpackAlias({
      "@core": path.resolve(__dirname, 'src/core'),
      "@config": path.resolve(__dirname, 'src/config'),
  })
)
