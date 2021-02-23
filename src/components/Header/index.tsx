import { defineComponent } from 'vue'

import useStyle from './style'

import Icon from '../Icon'

/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:06:43
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-22 16:39:34
 */
export default defineComponent({
  name: 'Header',
  setup() {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <Icon icon="wangyiyunyinle-" style="width: 100%; height: 100%" color="#000" />
        </div>
      )
    }
  }
})
