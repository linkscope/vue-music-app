/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-01 14:20:43
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-15 22:12:06
 */
import { defineComponent, PropType, withModifiers } from 'vue'
import { createUseStyles } from 'vue-jss'

import { Color, Font } from '@/assets/variables'

const useStyle = createUseStyles({
  container: {
    width: 20,
    padding: '20px 0',
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#999'
  },
  item: {
    padding: 3,
    lineHeight: 1.2,
    color: Color['$color-text-light'],
    fontSize: Font['$font-size-smallest']
  },
  activeItem: {
    color: Color['$color-theme']
  }
})

const touch = {
  startPageY: 0,
  endPageY: 0,
  startIndex: 0,
  endIndex: 0
}

export default defineComponent({
  name: 'SingerShortcut',
  props: {
    shortcutList: {
      type: Array as PropType<string[]>,
      required: true
    },
    onTouchMoveElement: {
      type: Function as PropType<(index: number) => void>,
      default: () => ''
    },
    activeIndex: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup(props) {
    const classesRef = useStyle()

    const onTouchStart = (event: TouchEvent) => {
      const index = (event.target as HTMLLIElement).getAttribute('data-index')!
      touch.startPageY = event.touches[0].pageY
      touch.startIndex = +index
      props.onTouchMoveElement(+index)
    }

    const onTouchMove = (event: TouchEvent) => {
      touch.endPageY = event.touches[0].pageY
      // 计算出y轴偏移量，除以每个字母的高度并向下取整
      const delta = ((touch.endPageY - touch.startPageY) / 18) | 0
      touch.endIndex = touch.startIndex + delta
      props.onTouchMoveElement(touch.endIndex)
    }

    return () => {
      const classes = classesRef.value
      const shortcutList = props.shortcutList
      return (
        <div
          class={classes.container}
          onTouchstart={withModifiers((event: TouchEvent) => onTouchStart(event), [
            'stop',
            'prevent'
          ])}
          onTouchmove={withModifiers((event: TouchEvent) => onTouchMove(event), [
            'stop',
            'prevent'
          ])}
        >
          <ul>
            {shortcutList.map((item, index) => (
              <li
                class={`${classes.item} ${index === props.activeIndex ? classes.activeItem : ''}`}
                data-index={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
})
