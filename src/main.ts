/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 16:02:35
 */
import { createApp } from 'vue'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue3-lazyload'

import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import '@/assets/style.css'

import App from './App'

// @ts-ignore
FastClick.attach(document.body)

createApp(App)
  .use(store)
  .use(router)
  .use(VueLazyLoad)
  .mount('#app')
