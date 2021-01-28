/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:27:56
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 13:35:45
 */
module.exports = {
  devServer: {
    port: 2000,
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
