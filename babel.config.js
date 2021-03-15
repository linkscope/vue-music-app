/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-15 10:20:35
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['@vue/babel-plugin-jsx'],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ]
}
