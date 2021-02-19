/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-19 09:42:24
 */
import { defineComponent, Fragment } from 'vue'
import { RouterView } from 'vue-router'

import Header from '@/components/Header'
import Tabs from '@/components/Tabs'
import Player from '@/components/Player'

export default defineComponent({
  name: 'App',
  setup() {
    return () => {
      return (
        <Fragment>
          <Header />
          <Tabs />
          <RouterView />
          <Player />
        </Fragment>
      )
    }
  }
})
