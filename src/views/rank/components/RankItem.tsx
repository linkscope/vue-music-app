/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-24 14:53:33
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 16:07:58
 */
import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

import { IRank } from '@/types'
import { Color, Font } from '@/assets/variables'

const useStyle = createUseStyles({
  container: {
    display: 'flex',
    margin: '0 20px',
    height: 100,
    paddingTop: 20,
    '&:last-child': {
      paddingBottom: 20
    }
  },
  coverImg: {
    flex: '0 0 100px',
    width: 100,
    height: 100
  },
  desc: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
    height: 100,
    overflow: 'hidden',
    color: Color['$color-text-dark'],
    fontSize: Font['$font-size-smaller']
  },
  descTitle: {
    fontSize: Font['$font-size-big'],
    fontWeight: 'bold',
    color: Color['$color-text']
  },
  descText: {
    marginTop: 10,
    lineHeight: 1.2,
    fontSize: Font['$font-size-smaller']
  }
})
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-24 14:53:33
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 15:27:13
 */
export default defineComponent({
  name: 'RankItem',
  props: {
    rank: {
      type: Object as PropType<IRank>,
      required: true
    },
    onClick: {
      type: Function as PropType<(id: number) => void>,
      default: () => ''
    }
  },
  setup(props) {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      const { coverImgUrl, name, description, id } = props.rank
      return (
        <li class={classes.container} onClick={() => props.onClick(id)}>
          <img class={classes.coverImg} v-lazy={coverImgUrl} alt="" />
          <div class={classes.desc}>
            <div class={classes.descTitle}>{name}</div>
            <div class={classes.descText}>{description}</div>
          </div>
        </li>
      )
    }
  }
})
