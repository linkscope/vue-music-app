/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:27:56
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-19 10:12:34
 */
module.exports = {
  devServer: {
    port: 2000,
    open: true,
    proxy: {
      '/api': {
        // target: 'https://netcloud.linkscope.cn',
        target: 'http://81.70.10.185:10000',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
