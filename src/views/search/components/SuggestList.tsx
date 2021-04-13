/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-09 15:02:03
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-10 15:15:20
 */
import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

import { searchSuggestListType } from '../index'
import { Color, Font } from '@/assets/variables'
import Icon from '@/components/Icon'
import ScrollView from '@/components/ScrollView'

const useStyle = createUseStyles({
  container: {
    height: '100%',
    overflow: 'hidden',
    zIndex: 150
  },
  list: {
    padding: '0 30px'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #eee',
    '&:last-child': {
      border: 'none'
    }
  },
  icon: {
    flex: '0 0 30px',
    width: 30,
    fontSize: Font['$font-size-small']
  },
  title: {
    flex: 1,
    fontSize: Font['$font-size-small'],
    color: Color['$color-text-dark'],
    overflow: 'hidden',
    lineHeight: '20px'
  }
})

export default defineComponent({
  name: 'SearchSuggestList',
  props: {
    suggestList: {
      type: Array as PropType<searchSuggestListType>,
      required: true
    },
    onClick: {
      type: Function as PropType<(name: string) => void>,
      default: () => ''
    }
  },
  setup(props) {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      const { suggestList, onClick } = props
      return (
        <ScrollView class={classes.container} data={suggestList}>
          <ul class={classes.list}>
            {suggestList.map((item) => (
              <li class={classes.item} key={item.id} onClick={() => onClick(item.name)}>
                <Icon class={classes.icon} icon={item.icon} color={Color['$color-background']} />
                <div class={classes.title}>{item.name}</div>
              </li>
            ))}
          </ul>
        </ScrollView>
      )
    }
  }
})
