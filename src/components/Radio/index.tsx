/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-04-04 20:00:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-04-04 20:20:36
 */
import { computed, defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

import { Color, Font } from '@/assets/variables'

const useStyle = createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: 240,
    margin: '0 auto',
    border: `1px solid ${Color['$color-highlight-background']}`,
    borderRadius: 5
  },
  item: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    fontSize: Font['$font-size-smaller'],
    color: Color['$color-text-dark'],
    '&.active': {
      backgroundColor: Color['$color-background-dark'],
      color: Color.$white
    }
  }
})

export default defineComponent({
  name: 'Radio',
  props: {
    radios: {
      type: Array as PropType<string[]>,
      required: true
    },
    modelValue: {
      type: Number as PropType<number>
    }
  },
  setup(props, { emit }) {
    const classesRef = useStyle()
    const currentIndex = computed({
      get: () => props.modelValue || 0,
      set: (value) => emit('update:modelValue', value)
    })
    return () => {
      const classes = classesRef.value
      return (
        <ul class={classes.container}>
          {props.radios.map((item, index) => (
            <li
              key={index}
              class={`${classes.item} ${currentIndex.value === index ? 'active' : ''}`}
              onClick={() => (currentIndex.value = index)}
            >
              {item}
            </li>
          ))}
        </ul>
      )
    }
  }
})
