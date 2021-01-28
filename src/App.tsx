/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 13:51:49
 */
import { defineComponent } from 'vue'

import Icon from '@/components/Icon'

export default defineComponent({
  name: 'App',
  setup() {
    return () => {
      return <Icon icon="kuaijin" />
    }
  }
})
