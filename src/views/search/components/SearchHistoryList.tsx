/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-15 23:47:38
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-25 15:47:24
 */
import { defineComponent, PropType, withModifiers } from 'vue'
import { createUseStyles } from 'vue-jss'

import { Color, Font } from '@/assets/variables'
import Icon from '@/components/Icon'

const useStyle = createUseStyles({
  item: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    overflow: 'hidden'
  },
  desc: {
    flex: 1
  },
  icon: {
    fontSize: Font['$font-size-smaller']
  }
})

export default defineComponent({
  name: 'SearchHistoryList',
  props: {
    searchList: {
      type: Array as PropType<string[]>,
      required: true
    },
    onClick: {
      type: Function as PropType<(name: string) => void>,
      default: () => ''
    },
    onDelete: {
      type: Function as PropType<(name: string) => void>,
      default: () => ''
    }
  },
  setup(props) {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      const { searchList, onClick, onDelete } = props
      return (
        <ul>
          {searchList.map((item) => (
            <li class={classes.item} onClick={() => onClick(item)}>
              <span class={classes.desc}>{item}</span>
              <div onClick={withModifiers(() => onDelete(item), ['stop'])}>
                <Icon class={classes.icon} icon="shanchu3" color={Color['$color-text-dark']} />
              </div>
            </li>
          ))}
        </ul>
      )
    }
  }
})
