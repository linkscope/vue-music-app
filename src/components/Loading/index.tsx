import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'
import { Font, Color } from '@/assets/variables'

/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 17:21:53
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 17:33:44
 */
const useStyle = createUseStyles({
  container: {
    width: '100%',
    textAlign: 'center'
  },
  title: {
    lineHeight: '20px',
    fontSize: Font['$font-size-smaller'],
    color: Color['$color-text-dark']
  }
})

export default defineComponent({
  name: 'Loading',
  props: {
    title: {
      type: String as PropType<string>,
      default: '加载中...'
    }
  },
  setup(props) {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <img src={require('@/assets/loading.gif')} alt="" width="24" height="24" />
          <p class={classes.title}>{props.title}</p>
        </div>
      )
    }
  }
})
