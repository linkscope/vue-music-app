/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:43:17
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 16:47:44
 */
import axios from 'axios'

const request = axios.create({
  timeout: 5000
})

request.interceptors.request.use((request) => {
  const prefix = process.env.VUE_APP_API_PRIFIX || '/api'
  request.url = prefix + request.url
  return request
})

request.interceptors.response.use((response) => {
  const data = response.data
  return data
})

export default request
