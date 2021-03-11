/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-10 16:23:13
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-11 10:59:24
 */
import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

import { Color, Font } from '@/assets/variables'
import { searchMatchingType } from '../index'
import Icon from '@/components/Icon'

const useStyle = createUseStyles({
  title: {
    margin: '0 0 10px 10px',
    fontSize: Font['$font-size-small'],
    color: Color['$color-text-dark']
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    height: 66
  },
  name: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    fontSize: Font['$font-size-medium'],
    color: Color['$color-text'],
    paddingLeft: 20
  },
  desc: {
    fontSize: Font['$font-size-smaller'],
    color: Color['$color-text-dark'],
    marginTop: 10
  },
  icon: {
    flex: '0 0 20px',
    fontSize: Font['$font-size-small'],
    transform: 'rotate(-180deg)'
  }
})

export default defineComponent({
  name: 'SearchMatchList',
  props: {
    matchList: {
      type: Array as PropType<searchMatchingType[]>,
      required: true
    },
    onClick: {
      type: Function as PropType<(item: searchMatchingType) => void>,
      default: () => ''
    }
  },
  setup(props) {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      const { matchList, onClick } = props
      return (
        <>
          <h1 class={classes.title}>最佳匹配</h1>
          <ul>
            {matchList.map((item) => (
              <li class={classes.item} key={item.id} onClick={() => onClick(item)}>
                <img src={item.picUrl} height="50" width="50" alt="" />
                <div class={classes.name}>
                  {item.name}
                  {item.description ? <span class={classes.desc}>{item.description}</span> : ''}
                </div>
                <Icon class={classes.icon} icon="fanhui" color={Color['$color-background']} />
              </li>
            ))}
          </ul>
        </>
      )
    }
  }
})
