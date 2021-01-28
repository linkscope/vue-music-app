/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 17:39:41
 */
import { defineComponent, Fragment } from 'vue'
import { RouterView } from 'vue-router'

import Header from '@/components/Header'
import Tabs from '@/components/Tabs'

export default defineComponent({
  name: 'App',
  setup() {
    return () => {
      return (
        <Fragment>
          <Header />
          <Tabs />
          <RouterView />
        </Fragment>
      )
    }
  }
})
