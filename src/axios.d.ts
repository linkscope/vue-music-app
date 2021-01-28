/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:56:35
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 22:00:56
 */
import axios from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
