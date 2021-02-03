/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:43:17
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-03 11:05:48
 */
import axios from 'axios'

const request = axios.create({
  timeout: 5000
})

request.interceptors.request.use((request) => {
  request.url = '/api' + request.url
  return request
})

request.interceptors.response.use((response) => {
  const data = response.data
  if (data.code === 200) {
    return data
  } else {
    return Promise.reject(data)
  }
})

export default request
