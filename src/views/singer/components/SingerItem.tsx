/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 18:49:45
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 19:33:07
 */
import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

import { SingerType } from '../index'
import { Font, Color } from '@/assets/variables'

const useStyle = createUseStyles({
  group: {
    paddingBottom: 30
  },
  title: {
    height: 30,
    lineHeight: '30px',
    paddingLeft: 20,
    fontSize: Font['$font-size-smaller'],
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0 0 30px'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: '50%'
  },
  name: {
    marginLeft: 20,
    color: Color['$color-text-dark'],
    fontSize: Font['$font-size-small']
  }
})
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 18:49:45
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 18:55:04
 */
export default defineComponent({
  name: 'SingerItem',
  props: {
    singer: {
      type: Object as PropType<SingerType>,
      required: true
    }
  },
  setup(props) {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      const { title, item } = props.singer
      return (
        <li class={classes.group}>
          <h2 class={classes.title}>{title}</h2>
          <ul>
            {item.map((singer) => (
              <li class={classes.item}>
                <img class={classes.avatar} v-lazy={singer.img1v1Url} alt="" />
                <span class={classes.name}>{singer.name}</span>
              </li>
            ))}
          </ul>
        </li>
      )
    }
  }
})
