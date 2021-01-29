/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 13:45:19
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 15:56:04
 */
import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

import { IRecommend } from '@/types'
import { Font, Color } from '@/assets/variables'

const useStyle = createUseStyles({
  item: {
    display: 'flex',
    boxSizing: 'border-box',
    padding: '0 20px 20px 20px'
  },
  pic: {
    flex: '0 0 60px',
    paddingRight: 20
  },
  desc: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '20px',
    overflow: 'hidden',
    fontSize: Font['$font-size-small']
  },
  descTitle: {
    marginBottom: 10,
    color: Color['$color-text'],
    fontSize: Font['$font-size-medium']
  },
  descContent: {
    color: Color['$color-text-dark'],
    fontSize: Font['$font-size-smaller']
  }
})
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 13:45:19
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 13:53:27
 */
export default defineComponent({
  name: 'RecommendList',
  props: {
    recommendList: {
      type: Array as PropType<IRecommend[]>,
      required: true
    }
  },
  setup(props) {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      const { recommendList } = props
      return (
        <ul>
          {recommendList.map((item) => (
            <li class={classes.item}>
              <div class={classes.pic}>
                <img src={item.picUrl} alt="" width="60" />
              </div>
              <div class={classes.desc}>
                <h2 class={classes.descTitle}>{item.name}</h2>
                <p class={classes.descContent}>{item.copywriter}</p>
              </div>
            </li>
          ))}
        </ul>
      )
    }
  }
})
