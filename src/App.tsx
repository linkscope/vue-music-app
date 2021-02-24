/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 10:55:21
 */
import {
  defineComponent,
  Fragment,
  KeepAlive,
  resolveDynamicComponent,
  Component as DynamicComponent
} from 'vue'
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
          <RouterView>
            {({ Component }: { Component: DynamicComponent }) => (
              <KeepAlive>{resolveDynamicComponent(Component)}</KeepAlive>
            )}
          </RouterView>
          <Player />
        </Fragment>
      )
    }
  }
})
