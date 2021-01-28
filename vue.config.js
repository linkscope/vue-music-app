/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:27:56
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 13:30:03
 */
module.exports = {
  devServer: {
    port: 1000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://netcloud.linkscope.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
