/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-03 11:27:22
 */
import { createStore, createLogger } from 'vuex'
import { IStore } from '@/types'

export default createStore<IStore>({
  state: {
    singerInfo: null
  },
  mutations: {
    SET_SINGER_INFO(
      state,
      singerInfo: {
        id: number
        title: string
        avatar: string
      }
    ) {
      state.singerInfo = singerInfo
    }
  },
  actions: {},
  modules: {},
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createLogger()]
})
