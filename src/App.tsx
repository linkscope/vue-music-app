/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-15 10:32:49
 */
import {
  defineComponent,
  Fragment,
  KeepAlive,
  resolveDynamicComponent,
  Component as DynamicComponent
} from 'vue'
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'

import { IStore } from '@/types'
import Header from '@/components/Header'
import Tabs from '@/components/Tabs'
import Player from '@/components/Player'
import { Loading } from 'vant'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore<IStore>()
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
          <div v-show={store.state.isLoading} class="loading-container">
            <Loading size="32" color="#1989fa" />
          </div>
          <Player />
        </Fragment>
      )
    }
  }
})
