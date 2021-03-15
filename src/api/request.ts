/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:43:17
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-15 10:47:00
 */
import axios from 'axios'
import store from '@/store'
import { Notify, Dialog } from 'vant'

const request = axios.create({
  timeout: 5000
})

request.interceptors.request.use((request) => {
  store.commit('SET_IS_LOADING', true)
  const prefix = process.env.VUE_APP_API_PRIFIX || '/api'
  request.url = prefix + request.url
  return request
})

request.interceptors.response.use(
  (response) => {
    store.commit('SET_IS_LOADING', false)
    const data = response.data
    return data
  },
  (error) => {
    const message: string = error.response.data.message
    if (~message.indexOf('暂无版权')) {
      Notify({
        type: 'danger',
        message
      })
    } else {
      Dialog.alert({
        title: '网络错误',
        message: '请重新刷新页面，点击按钮重新刷新',
        theme: 'round-button'
      }).then(() => {
        location.reload()
      })
    }
    store.commit('SET_IS_LOADING', false)
    return Promise.reject(message)
  }
)

export default request
