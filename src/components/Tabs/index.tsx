import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

import { IRouterLinkSlot } from '@/types'
import useStyle from './style'

/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:36:12
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 18:37:31
 */
export default defineComponent({
  name: 'Tabs',
  setup() {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <RouterLink
            to="/recommend"
            custom
            v-slots={{
              default: ({ navigate, isActive }: IRouterLinkSlot) => (
                <div class={classes.item} onClick={navigate}>
                  <span
                    class={`${isActive ? classes.routerActive : ''}`}
                    style="padding-bottom: 5px"
                  >
                    推荐
                  </span>
                </div>
              )
            }}
          />
          <RouterLink
            to="/singer"
            custom
            v-slots={{
              default: ({ navigate, isActive }: IRouterLinkSlot) => (
                <div class={classes.item} onClick={navigate}>
                  <span
                    class={`${isActive ? classes.routerActive : ''}`}
                    style="padding-bottom: 5px"
                  >
                    歌手
                  </span>
                </div>
              )
            }}
          />
          <RouterLink
            to="/rank"
            custom
            v-slots={{
              default: ({ navigate, isActive }: IRouterLinkSlot) => (
                <div class={classes.item} onClick={navigate}>
                  <span
                    class={`${isActive ? classes.routerActive : ''}`}
                    style="padding-bottom: 5px"
                  >
                    排行
                  </span>
                </div>
              )
            }}
          />
          <RouterLink
            to="/search"
            custom
            v-slots={{
              default: ({ navigate, isActive }: IRouterLinkSlot) => (
                <div class={classes.item} onClick={navigate}>
                  <span
                    class={`${isActive ? classes.routerActive : ''}`}
                    style="padding-bottom: 5px"
                  >
                    搜索
                  </span>
                </div>
              )
            }}
          />
        </div>
      )
    }
  }
})
